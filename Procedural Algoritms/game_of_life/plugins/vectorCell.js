// https://fonts.googleapis.com/css?family=Lato: 100,300,400,700|Luckiest+Guy|Oxygen:300,400
const __Max = 180 * 80 * 4;

class VectorCell {
    constructor(cell, layer, direction = 0) {
        this.currentCell = cell
        this.layer = layer

        this.direction = direction
        this.fullSpins = 0
    }

    getDirectionalNeighbours() {
        const {
                tm, 
            ml,     mr,
                bm
        } = this.layer.getCellNeighbours(this.currentCell);

        return [tm, mr, bm, ml]
    }

    // 
    rotateRight() {
        const a = this.direction + 1
        this.direction++

        if (this.direction > 3) {
            this.direction = 0
            this.fullSpins++
        }

        // console.log("rotating", this.currentCell.x, this.currentCell.y, this.direction)
        return a;
    }
}

export default class VectorCellsTrail {
    constructor(layer, initialCell, filter) {
        this.layer = layer
        this.filter = filter

        this.trail = []
        this.headVector = false
        // this.direction = 0

        this.addCell(initialCell);
    }

    addCell(cell) {
        // console.log("adding", cell.x, cell.y)
        const vectorCell = new VectorCell(cell, this.layer, 0)//this.direction)
        this.trail.push(vectorCell)
        this.headVector = vectorCell
    }

    getNextCell(index = 0) {
        if (index > __Max) {
            console.log("getNextCell value exceeds", this.headVector)
            return false
        }
        if (!this.headVector) {
            return false;
        }

        // if next cell is in the direction...
        // console.log("direction computed", this.headVector.direction)
        const nextNeighbour = this.getAvailableNeighbours() [this.headVector.direction]
        if (nextNeighbour) {
            return nextNeighbour
        }

        // if there are no available neighbours...
        if (this.headVector.fullSpins) {
            return false
        }

        // spin and repeat...
        this.rotatePosition()
        index++;
        return this.getNextCell(index)
    }

    getAvailableNeighbours() {

        const availableN = []
        this.headVector.getDirectionalNeighbours().forEach(cell => {
        //filter(cell => {
            if (cell && this.trail.findIndex(vectorCell => vectorCell.currentCell === cell) < 0) {
                if ( this.filter(this.headVector.currentCell, cell) ) {
                    availableN.push(cell)
                    return cell
                }
                availableN.push(false)
                return false
            }
            availableN.push(false)
            return false
        });
        // console.log("computed neightbuours", availableN)

        return availableN
    }

    rotatePosition() {
        // this.headVector.rotateRight()
        // console.log("rotating", this.headVector.currentCell.x, this.headVector.currentCell.y)
        //this.direction = 
        this.headVector.rotateRight()//this.headVector.direction
    }

    updateHeadVector(indx = 0) {

        if(indx > this.trail.length + 2) {
            return false
        }

        indx++

        // console.log("updating head vector", this.headVector.currentCell.x, this.headVector.currentCell.y)
        // trail back to the previous headVector and repeat getNextCell
        const a = this.trail.reverse();
        const headIndex = //a.length -
         a.findIndex(vectorCell => {
            // console.log("searching for an header...", vectorCell)
            return (vectorCell.currentCell !== this.headVector.currentCell) && (vectorCell.fullSpins < 1)
        }
            // (vectorCell.currentCell === this.headVector.currentCell) && (vectorCell.fullSpins < 1)
        );

        // console.log("computed trail index", a.length - headIndex, a.length)


        if (headIndex < 0 || headIndex == a.length) {
            // console.log("nope or finished")
            return false;
        }

        // update vectorHead
        this.headVector = this.trail[ headIndex ]
        // console.log("udpating", this.headVector)

        // this.direction = this.headVector.direction

        return true
    }

    updateTrail(index = 0) {
        if (index > __Max) {
            console.log("updateTrail value exceeds", this.headVector)
            return false
        }

        const nextCell = this.getNextCell();
        if (nextCell) {
            this.addCell(nextCell);
            return true
        }

        if (!this.updateHeadVector()) {
            return false
        }

        // trail back to the previous headVector and repeat getNextCell
        this.rotatePosition()
        index++;
        return this.updateTrail(index)
        
    }
}
