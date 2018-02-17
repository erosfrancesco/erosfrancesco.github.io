/*
	var player = {

		// this one is not used on characters, exept when they are not in control (Berserk/Confuse...)
		AI: 			function(){}, 
		
		BattleStatus: 	'Charging',
		Clock: 			FIFOAnimation(), // this one will be used for graphics
		
		// this one should be polyfilled in another function
		Counters: {
			Stop: 	_CounterStatus(18, p => { _callbackStopStatus(p); }),
			Sleep: 	_CounterStatus(10, p => { _callbackSleepStatus(p); }),
			...
		},

		Enemy: 			false,
		ImmuneTo: 		{},
		Name: 			'Bartz',
		Statuses: 		{},
		
		// this one too...
		Stats: {
			lif: 1920,
			man: 200,
			...
		}
	};

*/

_LoadObjectPlayer = (clonedObjfromGen) => {

	// load into PlayerPool
	let indx;

	if (!clonedObjfromGen.Enemy) { 
		indx = PlayerPool.thebads.length;
		PlayerPool.thebads.push(clonedObjfromGen);
		PlayerPool._aliveB.push(indx);
	}else{
		indx = PlayerPool.thegood.length;
		PlayerPool.thegood.push(clonedObjfromGen);
		PlayerPool._aliveG.push(indx);
	}

	SetATBof(clonedObjfromGen, indx);

	// polyfill
	clonedObjfromGen.Clock = FIFOAnimation();
	clonedObjfromGen.Statuses = {};
	clonedObjfromGen.ImmuneTo = {};
	clonedObjfromGen.Counters = { 

		Stop :   _CounterStatus(20, p => { _callbackStopStatus(p); }),
		Regen :  _CounterStatus(15, p => { _callbackRegenStatus(p); }),
		Poison : _CounterStatus(15, p => { _callbackPoisonStatus(p); }),
		Doom :   _CounterStatus(15, p => { _callbackDoomStatus(p); }), // need to check DOM
		Reflex : _CounterStatus(10, p => { _callbackReflexStatus(p); }),
		Sleep :  _CounterStatus(10, p => { _callbackSleepStatus(p); }),
	};

	polyfillStatsOf(clonedObjfromGen);
};

// this goes in ACTIVE ACTION LOOP, after every action
function _CheckDeadPlayers(performer, player, callback){



	//if( returnStatOf(player, 'lif') <= 0 ){

		//setStatOf(player, 'lif', 0);
		
		
		// some ultimate move...
		_UltimateMoveCheck(player, () => {

			//console.log('Are we there yet?');
			
			// remove it from arrays
			_KillPlayer(player);
			callback();

				//player.Clock.add( () => { 
					//console.log('Im dying!!');
					//player.Clock.add( () => { console.log('Im dead...'); });
					//player.Clock.add(callback);	
				//});

			//});

		});



	//}else{ callback(); }	

}




function _KillPlayer(player){

	var indx, ut;

	if(player.Enemy){
		indx = PlayerPool.thebads.indexOf(player);
		ut = PlayerPool._aliveB.indexOf(indx);
		PlayerPool._aliveB.splice(ut, 1);
	}else{
		indx = PlayerPool.thegood.indexOf(player);
		ut = PlayerPool._aliveG.indexOf(indx);
		PlayerPool._aliveG.splice(ut, 1);
	}
}

function _UltimateMoveCheck(player, callback){ if( player.FinalMove ){ player.FinalMove(callback); }else{ callback(); } }








