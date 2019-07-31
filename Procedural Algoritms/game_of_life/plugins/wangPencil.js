import computeWangTilesRelations from './wangRelations.js'


export default class WangPencil {

    static defaultWangMap = {
        "topLeft": 45,
        "topCenter": 46,
        "topRight": 47,
    
        "left": 61,
        "center": 62,
        "right": 63,
    
        "bottomLeft": 77,
        "bottomCenter": 78,
        "bottomRight": 79
    }

    constructor(GoLLayer, wangMap = WangPencil.defaultWangMap) {
        this.layer = GoLLayer
        this.wangRelations = computeWangTilesRelations(wangMap)
        this.wangMap = wangMap
    }

    draw(x, y) {
        this.setWangCell(x,      y,      "center")
        this.setWangCell(x + 1,  y - 1,  "topRight")
        this.setWangCell(x + 1,  y + 1,  "bottomRight")
        this.setWangCell(x - 1,  y + 1,  "bottomLeft")
        this.setWangCell(x - 1,  y - 1,  "topLeft")
        this.setWangCell(x,      y - 1,  "topCenter")
        this.setWangCell(x + 1,  y,      "right")
        this.setWangCell(x,      y + 1,  "bottomCenter")
        this.setWangCell(x - 1,  y,      "left")
    }

    setWangCell(x, y, positionSymbol) {
        const cell = this.layer.getCell(x, y)
        if (!cell) {
            return
        }

        const relationSymbol = this.wangMap[positionSymbol]
        const cellWangValue = cell.state.wangValue

        const newValue = (
            (cellWangValue && cellWangValue !== 0) && 
            this.wangRelations[relationSymbol] && 
            this.wangRelations[relationSymbol][cellWangValue]
        ) ? this.wangRelations[relationSymbol][cellWangValue] : relationSymbol
     
        
        cell.state.wangValue = newValue
    }
}