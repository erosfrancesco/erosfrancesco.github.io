import GoL from './GameOfLife.js';
const { layer } = GoL;
//const initialAliveProb = 45;


function ConvayLayer(width, height, initialInit) {
	const convay = new layer(width, height, initialInit);

	//
	convay.addRule('Standard_Conway_GoL_Ruleset', (cell, neighbours) => {
		const aliveCells = convay.countNeighbourProperty('isAlive', true, neighbours);

		if (cell.state.isAlive) {
			if (aliveCells < 2 || aliveCells > 5) {
				cell.state.isAlive = false;
			}
		} else {
			if (aliveCells === 3) {
				cell.state.isAlive = true;
			}
		}

		return cell;
	});

	return convay;
};

//
ConvayLayer.random = (initialAliveProb = 45) => {
	return () => {
		const isAlive = ( Math.random() * 100 < initialAliveProb) ? true : false
		return [{ name: 'isAlive', value: isAlive }];
	};
};



// const ConvayLayer = new layer(20, 20, (x, y) => {
// 	const isAlive = ( Math.random() * 100 < initialAliveProb) ? true : false
// 	return [{ name: 'isAlive', value: isAlive }];
// });

// ConvayLayer.addRule('Standard_Conway_GoL_Ruleset', (cell, neighbours) => {
// 	const aliveCells = this.countNeighbourProperty('isAlive', true, neighbours);

// 	if (cell.state.isAlive) {
// 		if (aliveCells < 2 || aliveCells > 5) {
// 			cell.state.isAlive = false;
// 		}
// 	} else {
// 		if (aliveCells === 3) {
// 			cell.state.isAlive = true;
// 		}
// 	}
// });


export default ConvayLayer;