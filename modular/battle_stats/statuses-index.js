import StatStatuses from './statuses-stat.js';
import TurnStatuses from './statuses-turn.js';


function BuildStatuses(activeStatuses) {

	let statuses = {};

	TurnStatuses.forEach(status => { statuses[status] = false; });
	StatStatuses.forEach(status => { statuses[status] = false; });
	activeStatuses = activeStatuses || {};
	Object.keys(activeStatuses).forEach(status => { statuses[status] = true; });
	
	return statuses;
}


export default {BuildStatuses, StatStatuses, TurnStatuses};