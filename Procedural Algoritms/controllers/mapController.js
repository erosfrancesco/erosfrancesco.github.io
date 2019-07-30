import Utils from '../game_of_life/plugins/utils.js';
const { convertLayerToTilemap, FilterBucket } = Utils;

const innerCellPropertyName = "innerCell"
const cornerCellPropertyName = "cornerCell"


//
export default function computeCornerByProperty(
    layer, 
    {name, value}, 
    tilemapCornerMap = {}, 
    innerCellValue = 0
) {
    value = value || true;

    const sameCellBucket = new FilterBucket(layer, (a, b) => {
        return (a.state[name] === value) && (b.state[name] === value)
    })

    const clusters = [];
    layer.cellIterator(cell => {
        if (cell && cell.state[name] !== value) {
            return
        }
    
        const {x, y} = cell
        // console.log("checking cell", x, y)
        clusters.push( sameCellBucket.getStaticClusterOf(x, y) )
    });
    
    clusters.forEach(c => drawCluster(layer, c, tilemapCornerMap, innerCellValue) );

    return {
        layer, 
        clusters, 
        convertToTilemap: converter => {
            return convertLayerToTilemap(layer, cell => convertCornerToTilemap(cell, converter) );
        }
    }
}


//
function convertCornerToTilemap(cell, callback = function(cell, b) { 
    if (!b && b !== 0) {
        return cell.state.valueConverted 
    }

    return b
}) {
    if (cell.state[cornerCellPropertyName]) {
        return callback(cell, cell.state[cornerCellPropertyName])
    }

    if (cell.state[innerCellPropertyName]) {
        return callback(cell, cell.state[innerCellPropertyName])
    }

    return callback(cell, false)
}


// 
function drawCluster(layer, cluster, cornerMap, innerCellValue) {
    const clusterNormals = []
    cluster.frontierCells.forEach((cell, i) => clusterNormals.push(cluster.getNormalVectorOfFrontierCell(i)) );

    clusterNormals.forEach((normalVector, index) => {
        const {cell} = cluster.frontierCells[index]
        const {x, y} = cell
        layer.setCell(x, y, computeCornerValue(cornerMap, normalVector) )
    });

    const properties = [{name: innerCellPropertyName, value: innerCellValue}]
    cluster.innerCells.forEach(({x, y}) => layer.setCell(x, y, properties))
}

function computeCornerValue(cornerMap, normalVector) {
    const value = cornerMap[normalVector] || cornerMap["Default"]
    return [{name: cornerCellPropertyName, value}, {name: "NormalVector", value: normalVector}]
}