import computeWangTilesRelations from './wangRelations.js'

const defaultWangMap = {
    "topLeft": 45,
    "topCenter": 46,
    "topRight": 47,

    "left": 61,
    "center": 62,
    "right": 63,

    "bottomLeft": 77,
    "bottomCenter": 78,
    "bottomRight": 79
};


function setWangTile(x, y, positionSymbol, cases, mainLayer) {
    const tile = mainLayer.getTileAt(x, y)
    if (tile) {
        const {index} = tile
        mainLayer.putTileAt(cases[positionSymbol][index] || positionSymbol, x, y)
    }
}



export default function terrainPencil(x, y, mainLayer, wangMap = defaultWangMap) {

    // corners
    const cases = computeWangTilesRelations(wangMap)
    const {
        topLeft,
        topCenter,
        topRight,
        left,
        center,
        right,
        bottomLeft,
        bottomCenter,
        bottomRight
    } = wangMap


    // center
    mainLayer.putTileAt(center, x, y)

    // Top Right
    setWangTile(x + 1, y - 1, topRight, cases, mainLayer)

    // Bottom Right
    setWangTile(x + 1, y + 1, bottomRight, cases, mainLayer)

    // Bottom Left
    setWangTile(x - 1, y + 1, bottomLeft, cases, mainLayer)

    // Top Left
    setWangTile(x - 1, y - 1, topLeft, cases, mainLayer)


    // Top Center
    setWangTile(x, y - 1, topCenter, cases, mainLayer)

    // Right Center
    setWangTile(x + 1, y, right, cases, mainLayer)

    // Bottom Center
    setWangTile(x, y + 1, bottomCenter, cases, mainLayer)

    // Left Center
    setWangTile(x - 1, y, left, cases, mainLayer)
}
