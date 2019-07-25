// https://fonts.googleapis.com/css?family=Lato: 100,300,400,700|Luckiest+Guy|Oxygen:300,400

class VectorCell {
    constructor(cell, layer, direction = 0) {
        this.currentCell = cell
        this.layer = layer
        //this.filter = filter

        this.direction = direction
        this.fullSpins = 0
        this.surfaceNormalVector = 0 // compute it!
    }

    getDirectionalNeighbours() {
        const {
                tm, 
            ml,     mr,
                bm
        } = this.layer.getCellNeighbours(this.currentCell);

        return [tm, mr, bm, ml]
    }
    
    // getMatchingNeighbours() {
    //     return this.layer.filterNeighboursOf(this.currentCell)
    // }
    
    // 
    // getNextCell() {
    //     return this.getPossibleNextCells()[this.direction]
    // }

    // getPossibleNextCells() {
    //     const neighbours = this.layer.getCellNeighbours(this.currentCell)
    //     const {
    //             tm,
    //         ml,     mr,
    //             bm
    //     } = neighbours

    //     return [tm, mr, bm, ml]
    // }

    // getSurfaceNormalVector() {
    //     const filteredNeighbours = this.filterNeighboursOf(
    //         this.currentCell, 
    //         cellState => cellState.isWall === this.currentCell.state.isWall
    //     );

    //     const {
    //         tl, tm, tr,
    //         ml,     mr,
    //         bl, bm, br, count
    //     } = filteredNeighbours;
        
    //     const vectors = [];

    //     // check if there are more than 4 filtered Neighbours
    //     if (count > 4) {
    //         // this cell's directional vector points externally, 
    //         // so none of its normal can be internal to the surface
    //         return vectors;
    //     } 

    //     switch (true) {
    //         case tm && (tl || tr):
    //             vectors.push(0)
    //         case mr && (tr || br):
    //             vectors.push(1)
    //         case bm && (bl || br):
    //             vectors.push(2)
    //         case ml && (tl || bl):
    //             vectors.push(3)
            
    //         case tr && !(tm || tl || ml || mr || bl || bm || br):
    //             vectors.push(4)
    //         case br && !(tm || tl || ml || mr || bl || bm || tr):
    //             vectors.push(5)
    //         case bl && !(tm || tl || ml || mr || tr || bm || br):
    //             vectors.push(6)
    //         case tl && !(tm || tr || ml || mr || bl || bm || br):
    //             vectors.push(7)
    //     }

    //     return vectors;
    // }

    // 
    rotateRight() {
        this.direction++

        if (this.direction > 3) {
            this.direction = 0
            this.fullSpins++
        }
    }
}


class VectorCellsTrail {
    constructor(layer, initialCell, filter) {
        this.layer = layer
        this.filter = filter

        this.trail = []
        this.headVector = false
        this.direction = 0

        this.addCell(initialCell);
    }
    

    addCell(cell) {
        const vectorCell = new VectorCell(cell, this.layer, this.direction)
        this.trail.push(vectorCell)
        this.headVector = vectorCell
    }

    getNextCell() {
        if (!this.headVector) {
            return;
        }

        // if next cell is in the direction...
        const nextNeighbour = this.getAvailableNeighbours() [this.direction]
        if (nextNeighbour) {
            return nextNeighbour
        }

        // if there are no available neighbours...
        if (this.headVector.fullSpins) {
            return false
        }

        // spin and repeat...
        this.rotatePosition()
        return this.getNextCell()
    }

    getAvailableNeighbours() {
        return this.headVector.getDirectionalNeighbours().filter(cell => {
            if (cell && this.trail.findIndex(vectorCell => vectorCell.currentCell === cell) < 0) {
                if ( this.filter(this.headVector.currentCell, cell) ) {
                    return cell
                }

                return false
            }

            return false
        });
    }

    rotatePosition() {
        this.headVector.rotateRight()
        this.direction = this.headVector.direction
    }

    updateTrail() {
        const nextCell = this.getNextCell();
        if (nextCell) {
            this.addCell(nextCell);
            return true
        }

        // trail back to the previous headVector and repeat getNextCell
        const headIndex = this.trail.findIndex(vectorCell => vectorCell.currentCell === this.headVector.currentCell);

        if (headIndex < 1) {
            console.log("nope or finished")
            return false;
        }

        // update vectorHead
        this.headVector = this.trail[headIndex - 1]
        this.rotatePosition()
        return this.updateTrail()
        
    }
}


export default VectorCellsTrail