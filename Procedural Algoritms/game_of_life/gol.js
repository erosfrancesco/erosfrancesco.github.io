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
        const cell = new GoLCell(this.x, this.y);
        cell.state = Object.assign({}, this.state);

        return cell;
    }

    this.isEqualTo = cell => {
        return (cell.x === this.x && cell.y === this.y)
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


    //
    this.getCellNeighbours = cell => {
        if (!cell) {
            return false;
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
    this.countNeighbourProperty = (name, value, neighbours) => {
        let result = 0;
        Object.keys(neighbours).forEach(cellPositionSymbol => {
                const cell = neighbours[cellPositionSymbol];
                
                if (cell.state && cell.state[name] === value) {
                    result++;
                }
        });
        return result;
    };
    this.filterNeighboursOf = (cell, filter) => {
        const neighbours = this.getCellNeighbours(cell)
        if (!neighbours) {
            return 0;
        }

        const results = {};
        let count = 0;
        Object.keys(neighbours).forEach(cellPositionSymbol => {
            const cell = neighbours[cellPositionSymbol];
            results[cellPositionSymbol] = (cell.state && filter( cell.state ))
            if (results[cellPositionSymbol]) {
                count++;
            }
        });
        results.count = count;
        
        return results;
    };

    //
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

        if (!rule) {
            return cell;
        }

        const cellUpdated = rule.rule(cell, cellNeightbours);
        return this.computeCellState(cellUpdated, cellNeightbours, ruleIndex + 1);
    };

    this.update = () => {
        const buffer = [];
        this.cellIterator(cell => buffer.push(cell.copy()) );

        buffer.forEach((cell, indx) => {
            const cellNeightbours = this.getCellNeighbours(cell);
            if (!cellNeightbours) {
                console.log("wut?", cell)
                return;
            }
            const updatedCell = this.computeCellState(cell, cellNeightbours);
            buffer[indx] = updatedCell
        });

        buffer.forEach(updatedCell => {
            this.getCell(updatedCell.x, updatedCell.y).state = updatedCell.state;
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
    Layer: GoLLayer,
    Cell: GoLCell
}
