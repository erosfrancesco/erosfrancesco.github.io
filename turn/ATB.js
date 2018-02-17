// BattleStatus = ['Charging', 'Ready', 'Performing', 'Waiting']

let _ATBMAX              = 12255, // this should be determined on battle start, based on fastest character
    Battle_Speed         = 1, // this should be based on the most fastest character and slowest enemy
    _Time_Flow_Is_Active = true;

/**/ActiveTimeFlowLoop = () => { 
	if (IsGraphicReady) { PlayerPool.execute_for_every_alive(ABTBasicLoopFor); }
	};

	ABTBasicLoopFor = (player) => {

		if (player.Statuses.Stop) { // status stop checks
			_timerLoopCounters(player, 'Stop', _callbackStopStatus);
		}else{
			UpdateATBOf(player); // DOM.
			_countersValidator( player );
		}
	};
/**/

/**/UpdateATBOf = (player) => {

	if (player && player.BattleStatus == 'Charging') {
		
		player.ATBobj.Value += IncrementATBOf(player);

		if (player.ATBobj.Value >= _ATBMAX) {

			player.ATBobj.Value = _ATBMAX;

			/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
			if( _Time_Flow_Is_Active ){
				player.BattleStatus = 'Ready';
				_GiveTurnToPlayer(player);
				_ResolveFirstPlayerTurn(player);
				//console.log( player.Name + ' is active');
				if( !player.Enemy ){ ATBToggleFull(player); }
			}
			/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
			
		}

		if (!player.Enemy) {
			UpdateATBDOM(player, (player.ATBobj.Value * 100 / _ATBMAX) );
		}
		
	}
	};

	IncrementATBOf = (player) => {

		let s = returnVelof(player);
		s+=20;
		
		if (player.Statuses.Slow) { s*=3; }else{

			if (player.Statuses.Haste) {
				s*=8;
			}else{ s*=6; }
		}

		if (player.Enemy) { s += (Battle_Speed - 1); }

		return s;
	};

	ResetATBOf = (player) => {
		ATBToggleEmpty(player.ATBobj);
		player.BattleStatus = 'Charging';
	}; 
/**/

/* Dummy */ returnVelof = (player) => { return returnStatOf(player, 'velocity'); };