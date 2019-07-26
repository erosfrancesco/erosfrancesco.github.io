import VectorCellsTrail from './vectorCell.js';


class FrontierCell {
    constructor(cluster, index) {
        this.cell = cluster.cells[index]
        this.tm = false
        this.mr = false
        this.bm = false
        this.ml = false

        if (!this.cell) {
            return
        }
        
        const neightbours = this.getDirectionalNeighbours(cluster)
        if (!neightbours) {
            this.cell = false
            return
        }

        const [tm, mr, bm, ml] = neightbours
        if (tm && mr && bm && ml) {
            this.cell = false
            return
        }

        this.tm = Boolean(tm)
        this.mr = Boolean(mr)
        this.bm = Boolean(bm)
        this.ml = Boolean(ml)
    }

    getDirectionalNeighbours(cluster) {
        const neighbour = cluster.layer.getCellNeighbours(this.cell);
        if (!neighbour) {
            return false
        }

        const {
                tm, 
            ml,     mr,
                bm
        } = neighbour

        let res = []
        const a = [tm, mr, bm, ml]
        a.forEach(neighbour => {
            if (!neighbour) {
                res.push(false)
                return
            }
            const isOfCluster = cluster.filter(this.cell, neighbour)
            res.push(isOfCluster ? neighbour : false)
        })

        return res
    }
    
}

export default class Cluster extends VectorCellsTrail {
    constructor(layer, x, y, filter) {
        super(layer, layer.getCell(x, y), filter);

		while (super.updateTrail()) {		
        }
        
        this.cells = []
        this.trail.forEach(vectorCell => this.cells.push(vectorCell.currentCell) )

        this.frontierCells = []
        this.cells.forEach((cell, index) => {
            const frontierCell = new FrontierCell(this, index)
            if (frontierCell) {
                this.frontierCells.push(frontierCell)
            }
        })

        this.innerCells = []
        this.cells.forEach(clusterCell => {
            const frontierIndex = this.frontierCells.findIndex( ({cell}) => {
                if (!cell) {
                    return false
                }
                return cell.isEqualTo(clusterCell) 
            })
            
            if (frontierIndex < 0) {
                this.innerCells.push(clusterCell)
            }
        })
    }

    forEachCell(iterator = function(cell, index) {}) {
		this.cells.forEach(iterator)
    }


    getNormalVectorOfFrontierCell(index) {
        const frontierCell = this.frontierCells[index]
        if (!frontierCell) {
            return false
        }

        const {tm, mr, bm, ml} = frontierCell

        let vector = true

        switch (true) {
            // 
            case tm && !mr && !bm && !ml: 
            vector = "OnlyUp";
                break;
            case !tm && mr && !bm && !ml: 
            vector = "OnlyRight";
                break;
            case !tm && !mr && bm && !ml: 
            vector = "OnlyBottom";
                break;
            case !tm && !mr && !bm && ml: 
            vector = "OnlyLeft";
                break;

            //
            case tm && mr && !bm && !ml: 
            vector = "TopRight";
                break;
            case tm && !mr && !bm && ml: 
            vector = "TopLeft";
                break;
            case !tm && mr && bm && !ml: 
            vector = "BottomRight";
                break;
            case !tm && !mr && bm && ml: 
            vector = "BottomLeft";
                break;

            //
            case !tm && mr && !bm && ml: 
            vector = "Orizzontal";
                break;
            case tm && !mr && bm && !ml: 
            vector = "Vertical";
                break;

            //
            case tm && mr && bm && !ml: 
            vector = "ExceptLeft";
                break;
            case tm && mr && !bm && ml: 
            vector = "ExceptBottom";
                break;
            case tm && !mr && bm && ml: 
            vector = "ExceptRight";
                break;
            case !tm && mr && bm && ml: 
            vector = "ExceptTop";
                break;

            //
            default:
            vector = false;
                break;
        }

        return vector
    }
}
