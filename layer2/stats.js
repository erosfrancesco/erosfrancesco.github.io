/**/
const Stats_Dummy_Reference = {
	
	maxLife: 1,
	maxMana: 1,

	lif: 1,
	man: 1,
	
	vigor: 1,// or attack, if you want
	stamina: 1,// or defense, if you want
	
	magic: 1,
	defMagic: 1,

	velocity: 1,
	evade: 1,

}

polyfillStatsOf = (player) => {
	player.Stats = player.Stats || {};
	Object.keys(Stats_Dummy_Reference).forEach( stat => {
		player.Stats[stat] = player.Stats[stat] || Stats_Dummy_Reference[stat];
	});
}

returnStatOf = (player, stat) => { return player.Stats[stat]; }
setStatOf = (player, stat, val) => { player.Stats[stat] = val; }
