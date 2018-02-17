/**/let PlayerPool = {

	thegood:[], // all characters
	thebads:[], // all enemys
	_aliveG:[], // all alive characters (ref only)
	_aliveB:[], // all alive enemys (ref only)

	// add player to battle
	add: function(player){

		if(player.Enemy){
			PlayerPool.thebads.push(player);
			PlayerPool._aliveB.push( PlayerPool.thebads.indexOf(player) );
		}else{
			PlayerPool.thegood.push(player);
			PlayerPool._aliveG.push( PlayerPool.thegood.indexOf(player) );
		}
	},

	// iterator
	execute_for_every_alive: function(fun){
		Object.keys(PlayerPool._aliveG).forEach( indx => { fun( PlayerPool.indx_player(indx) ); });
		Object.keys(PlayerPool._aliveB).forEach( indx => { fun( PlayerPool.indx_enemy(indx) ); });
	},

	// return all enemys and characters alive and not notSelectable
	return_all : function(){
		let targets = PlayerPool.return_enemy();
		targets = PlayerPool.return_players(targets);
		return targets;
	},

	// return all enemys alive and not notSelectable
	return_enemy : function(targets){
		
		targets = targets || [];

		Object.keys(PlayerPool._aliveB).forEach( key => { 
			var P = this.indx_enemy(key); if( !P.notSelectable ){ targets.push(P); } 
		});

		return targets;
	},

	// return all characters alive and not notSelectable
	return_players : function(targets){
		
		targets = targets || [];

		Object.keys(PlayerPool._aliveG).forEach( key => { 
			var P = this.indx_player(key); if( !P.notSelectable ){ targets.push(P); } 
		});

		return targets;
	},

	// return alive enemy
	indx_enemy : function(indx){ return this.thebads[ PlayerPool._aliveB[indx] ]; },
	// return alive character
	indx_player : function(indx){ return this.thegood[ PlayerPool._aliveG[indx] ]; },

	// Setup targets of the action of the player
	setup_action_targets : function(player, action, typeoftarget){
		// should check this
		SetActionOf(player, action);
		var targets = PlayerPool[typeoftarget]();
		_SetupTargetMenuWith(targets);
	},

	return_random_player : function(){

		var random = _dice_roll( PlayerPool._aliveG.length - 1 );
		var oldChk = random;

		while( PlayerPool.indx_player(random).notSelectable ){

			random++;
			if(random == oldChk){ console.log('All not selectable!'); return PlayerPool.indx_player(random); }
			random %= PlayerPool._aliveG.length;
		}

		return PlayerPool.indx_player(random);
	},

	return_random_target : function(){
		
		var random = _dice_roll( PlayerPool._aliveB.length - 1 );
		var oldChk = random;

		while( PlayerPool.indx_enemy(random).notSelectable ){
			random++;
			if(random == oldChk){ console.log('All not selectable!'); return PlayerPool.indx_enemy(random); }
			random %= PlayerPool._aliveB.length;
		}

		return PlayerPool.indx_enemy(random);
	}
};
