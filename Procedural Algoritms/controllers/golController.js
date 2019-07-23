import Cave from '../game_of_life/cave.js';

function mapGenerator(...args) {
    const [mapWidth = 24, mapHeight = 24, initialConfigs = Cave.random(55), p1 = 3, p2 = 3] = args;
    const GoLmap = new Cave(mapWidth, mapHeight, initialConfigs);

    // custom ruleset
    const propertyName = "isWall";
    GoLmap.addRule('Custom_Cave_Ruleset', (cell, neighbours) => {
        const matchCells = GoLmap.countNeighbourProperty(propertyName, true, neighbours);
        const nonMatchCells = GoLmap.countNeighbourProperty(propertyName, false, neighbours);
    
        if (cell.state[propertyName]) {
            if (matchCells < p1) {
                cell.state[propertyName] = false;
            }
        }
    
        if (!cell.state[propertyName]) {
            if (nonMatchCells < p2) {
                cell.state[propertyName] = true;
            }
        }
    
        return cell;
    });
    
    
    // utils
    GoLmap.convertToTilemap = conversion => {
        const data = [[]];
    
        GoLmap.cellIterator(cell => {
            const {x, y} = cell;
            data[y] = data[y] || [];
            data[y][x] = conversion(cell);
        });
    
        return data;
    };

    return GoLmap
};

    
export default mapGenerator