import GoL from './GoL.js';
const {layer, cell} = GoL;

const initialAliveProb = 45;



const countPropertyOnNeightbors = (name, value, neighbours) => {
	let result = 0;
	Object.keys(neighbours).forEach(cellPositionSymbol => {
			const cell = neighbours[cellPositionSymbol];
			if (cell.state[name] === value) {
				result++;
			}
	});
	return result;
};

const ConvayLayer = new layer(20, 20, (x, y) => {
	const isAlive = ( Math.random() * 100 < initialAliveProb) ? true : false
	return [{ name: 'isAlive', value: isAlive }];
});



ConvayLayer.addRule('Standard_Conway_GoL_Ruleset', (cell, neighbours) => {
	const aliveCells = countPropertyOnNeightbors('isAlive', true, neighbours);
	const deadCells =  countPropertyOnNeightbors('isAlive', false, neighbours);

	if (cell.state.isAlive) {
		if (aliveCells < 2 || aliveCells > 5) {
			cell.state.isAlive = false;
		}
	} else {
		if (aliveCells === 3) {
			cell.state.isAlive = true;
		}
	}
});

ConvayLayer.update();

console.log(ConvayLayer.cells);