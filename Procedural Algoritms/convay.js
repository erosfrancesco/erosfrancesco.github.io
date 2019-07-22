import GoL from './GameOfLife.js';
const { layer } = GoL;


function ConvayLayer(width, height, initialInit) {
	const convay = new layer(width, height, initialInit);

	const propertyName = 'isAlive';

	//
	convay.addRule('Standard_Conway_GoL_Ruleset', (cell, neighbours) => {
		const aliveCells = convay.countNeighbourProperty(propertyName, true, neighbours);

		if (cell.state[propertyName]) {
			if (aliveCells < 2 || aliveCells > 5) {
				cell.state[propertyName] = false;
			}
		} else {
			if (aliveCells === 3) {
				cell.state[propertyName] = true;
			}
		}

		return cell;
	});

	return convay;
};

//
ConvayLayer.random = (initialAliveProb = 45, name = "isAlive") => () => [{ 
	name, 
	value: ( Math.random() * 100 < initialAliveProb) 
}];


export default ConvayLayer;