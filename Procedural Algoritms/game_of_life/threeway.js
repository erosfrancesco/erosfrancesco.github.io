import GoL from './GameOfLife.js';
const { Layer } = GoL;
const propertyName = 'isWall';


function CaveLayer(width, height, initialInit) {
	const cave = new Layer(width, height, initialInit);	

	//
	cave.addRule('Cave_GoL_Ruleset', (cell, neighbours) => {
		const match1Cells = cave.countNeighbourProperty(propertyName, 1, neighbours);
		const match2Cells = cave.countNeighbourProperty(propertyName, 2, neighbours);
		const match3Cells = cave.countNeighbourProperty(propertyName, 3, neighbours);

		if (cell.state[propertyName] === 1) {
			if (match1Cells < 4 || match2Cells === 8) {
				cell.state[propertyName]++;
			}
		} else {

			if (cell.state[propertyName] === 2) {
				cell.state[propertyName]++;
				
				if (match2Cells > 4) {
					cell.state[propertyName]++;
				}
			} else {
				if (match3Cells > 5) {
					cell.state[propertyName] = 1;
				}
			}
		}

		return cell;
	});

	return cave;
};

//
CaveLayer.random = (initialAliveProb = 45) => () => {
	const rand = Math.floor(Math.random() * 100);
	const value = ( rand < initialAliveProb / 2 ) ? 1 : ( (rand < initialAliveProb) ? 2 : 3 )
	return [{ 
		name: propertyName, 
		value
	}];
}


export default CaveLayer;