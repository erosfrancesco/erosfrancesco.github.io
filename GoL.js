function GoLCell (x = 0, y = 0, cellProperties = []) {
    this.x = x;
    this.y = y;
    this.state = {};

    this.getState = name => {
        const prop = this.state[name]
        return prop ? prop.value : false;
    };

    this.setState = (name, value) => {
        this.state[name] = value;
    };

    this.copy = () => {
        const properties = [];
        Object.keys(this.state).forEach(name => {
            const value = this.state[name];
            properties.push({name, value});
        });
        return new GoLCell(this.x, this.y, properties);
    }

    //
    cellProperties.forEach(cellProperty => {
        const {name, value} = cellProperty;
        this.setState(name, value);
    });
}

function GoLLayer (width = 100, height = 100, cellPropertiesDistribution = function(x, y) { return []; }) {
    this.width = width;
    this.height = height;
    this.cells = [[]];
    this.rules = [];

    //
    this.getCell = (x = 0, y = 0) => {
        if (! (this.cells[y] && this.cells[y][x]) ) {
            return false;
        }
        return this.cells[y][x];
    }
    this.setCell = (x = 0, y = 0, cellProperties) => {
        this.cells[y] = this.cells[y] || [];
        this.cells[y][x] = new GoLCell(x, y, cellProperties);
    }
    this.cellIterator = (iteratee = function(cell) { }) => 
        this.cells.forEach((row, y) => row.forEach((cell, x) => iteratee( this.getCell(x, y) ))
    );
    this.getCellNeighbours = cell => {
        if (!cell) {
            return;
        }

        const {x, y} = cell;
        const tl = this.getCell(x - 1, y - 1);
        const tm = this.getCell(x,     y - 1);
        const tr = this.getCell(x + 1, y - 1);

        const ml = this.getCell(x - 1, y);
        const mr = this.getCell(x + 1, y);

        const bl = this.getCell(x + 1, y + 1);
        const bm = this.getCell(x,     y + 1);
        const br = this.getCell(x - 1, y + 1);

        return {
            tl, tm, tr,
            ml,     mr,
            bl, bm, br
        };
    };

    this.addRule = (id, rule = function(cell, neightbours) { return cell; }) => this.rules.push({id, rule});
    this.removeRule = id => {
        const indx = this.rules.findIndex(item => item.id === id);
        if (indx < 0) {
            return;
        }
        this.rules.splice(indx, 1);
    };


    //
    this.computeCellState = (cell, cellNeightbours, ruleIndex = 0) => {
        const rule = this.rules[ruleIndex];

        if (rule) {
            return cell;
        }

        const cellUpdated = rule[rule](cell, cellNeightbours);
        this.computeCellState(cellUpdated, cellNeightbours, ruleIndex + 1);
    };

    this.update = () => {
        const buffer = [];
        this.cellIterator(cell => buffer.push(cell.copy()) );

        buffer.forEach((cell, indx) => {
            const cellNeightbours = this.getCellNeighbours(cell);
            buffer[indx] = this.computeCellState(cell, cellNeightbours);
        });

        buffer.forEach(updatedCell => {
            const cell = this.getCell(updatedCell.x, updatedCell.y);
            Object.keys(updatedCell.state).forEach(name => {
                const value = updatedCell.state[name];
                cell.setState(name, value);
            })
        });
    };


    //
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            this.setCell(x, y, cellPropertiesDistribution(x, y))
        }
    }
};


export default {
    layer: GoLLayer,
    cell: GoLCell
}