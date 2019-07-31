import Cluster from './clusters.js';
import WangPencil from './wangPencil.js'
import GoL from '../gol.js';
const {Layer} = GoL

// Conversion
function convertArrayToLayer(w, h, data, conversion = function(value) { return [{name:"valueConverted", value}]; }) {
	// if (data.length !== w * h) {
	// 	console.log("nope!", data.length + " is not multiple of " + w + " and " + h)
	// }

	return new Layer(w, h, (x, y) => conversion(data[y + h * x]) );
}

function convertLayerToTilemap(layer, conversion = function(cell) { return 0 }) {
	const data = [[]];

	layer.cellIterator(cell => {
		const {x, y} = cell;
		data[y] = data[y] || [];
		data[y][x] = conversion(cell);
	});

	return data;
}

class FilterBucket {
	constructor(layer, filter) {
		this.layer = layer
		this.filter = filter
		
		this.saved = []
	}

	getStaticClusterOf(x, y) {
		const clusterIndex = this.saved.findIndex(cluster => {
			let ret = false
			cluster.forEachCell(cell => {
				if (cell.x === x && cell.y === y) {
					ret = true
					return ret
				}
			})
			return ret
		});
		
		if (clusterIndex > -1) {
			return this.saved[clusterIndex]
		}
		
		this.saved.push( this.getClusterOf(x, y) )

		return this.saved[this.saved.length - 1]
	}

	getClusterOf(x, y) {
		return new Cluster(this.layer, x, y, this.filter)
	}
}


export default {
	convertArrayToLayer,
	convertLayerToTilemap,
	FilterBucket,
	WangPencil
}