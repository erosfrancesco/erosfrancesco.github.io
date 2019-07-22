import GoL from './GameOfLife.js';
const { layer } = GoL;
const propertyName = 'isWall';


function CaveLayer(width, height, initialInit) {
	const cave = new layer(width, height, initialInit);	

	//
	cave.addRule('Cave_GoL_Ruleset', (cell, neighbours) => {
		const matchCells = cave.countNeighbourProperty(propertyName, true, neighbours);

		if (cell.state[propertyName]) {
			if (matchCells < 4) {
				cell.state[propertyName] = false;
			}
		} else {
			if (matchCells > 5) {
				cell.state[propertyName] = true;
			}
		}

		return cell;
	});

	return cave;
};

//
CaveLayer.random = (initialAliveProb = 45) => () => [{ 
	name: propertyName, 
	value: ( Math.random() * 100 < initialAliveProb) 
}];


export default CaveLayer;