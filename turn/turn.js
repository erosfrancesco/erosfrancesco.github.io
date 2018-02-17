// BattleStatus = ['Charging', 'Ready', 'Performing', 'Waiting']

/**/let TurnStack = [], 	// players stack
	    CurrentCharacter; 	// current character

	_ReturnCurrentPlayer = () => { return TurnStack[0]; };

	_GiveTurnToPlayer = (player) => { TurnStack.push(player); };
	
	_RemovePlayerFromStack = (player) => { 
		player.BattleStatus = 'Waiting'; 
		TurnStack.splice(TurnStack.indexOf(player), 1);
	};


/* If the first player that must have turn is an enemy, or is confused or berserk or whatever...*/

	_ResolveFirstPlayerTurn = (player) => {

		// this if is important. Open to adding.
		if( player.Enemy || player.Statuses.Confuse || player.Statuses.Berserk ){
			
			player.AI(); // this must set an action and a target
			_RemovePlayerFromStack(player);
			
		}else{

			if (CurrentCharacter == null) {
				
				CurrentCharacter = player;
				// load menus and everything
				MenuManager.push( _Battle_Menu );
				// ATB signature for current character...
				player.ATBobj.Name.style.color = _Menu_Options.activePlayerNameColor;
			}
		}
	}

	_endCharacterTurn = (player) => {

		// ATB
		player.BattleStatus = 'Performing';
		player.ATBobj.Name.style.color = _Menu_Options.ActiveColor;
		//console.log(player.Name, ' has been resolved its turn');
		
		// remove player from turnstack
		_RemovePlayerFromStack(player);
		// remove menus...
		_removeAllBattleMenus();
		// remove references
		CurrentCharacter = null;
		// switch turn
		_ResolveFirstPlayerTurn(_ReturnCurrentPlayer());
	};


/* _Load action... */