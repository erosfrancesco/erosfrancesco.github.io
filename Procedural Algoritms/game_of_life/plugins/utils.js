// import VectorCell from './vectorCell.js';
import GoL from '../gol.js';
const {Layer} = GoL

//function GoLLayer (width = 100, height = 100, cellPropertiesDistribution = function(x, y) { return []; })

function convertArrayToLayer(w, h, data, conversion = function(value) { return [{name:"valueConverted", value}]; }) {
	if (data.length !== w * h) {
		console.log("nope!", data.length + " is not multiple of " + w + " and " + h)
	}

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
};


export default {
	convertArrayToLayer,
	convertLayerToTilemap
}