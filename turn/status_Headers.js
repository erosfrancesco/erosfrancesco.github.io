/*Approxymately every real-time second, a function is called on every Counters of every players*/
/*That is, if the player hasn't stop status. That one is checked in the turn loop*/

	function _CounterStatus(seconds, callback){

		return {
			Clock: FIFOAnimation(),
			_pTimer: 0,
			Count: 0,
			Seconds: seconds,
			SecondCounter: 0,
			Callback: callback
		};
	}

	_countersValidator = function(player){

		Object.keys(player.Counters).forEach( status => {
			if( player.Statuses[status] ){ _timerLoopCounters(player, status, player.Counters[status].Callback); }
		});

	}

	_timerLoopCounters = function(player, status, callback){

		var _c = player.Counters[status];
		_c.SecondCounter++;
		if(_c.SecondCounter > 16) { _every16Loops(player, status, callback); _c.SecondCounter = 0; }
	}

	_every16Loops = function(player, status, callback){

		console.log('Hello there');
		if(player.Counters[status].Count > 255){ 
			player.Counters[status].Count -= 256;
			callback(player); 
		}else{
			
			var _value;
			if(player.Statuses.Haste){
				_value = 84;
			}else{
				if(player.Statuses.Slow){
					_value = 32;
				}else{
					_value = 64;
				}
			}

			player.Counters[status].Count += _value;
		}
	}
/*-----------------------------------------------------------------------------------------------*/

/**/function _giveAlteredStatus(player, status, callback){

		if( !( player.ImmuneTo[status] || player.Statuses[status] ) ){
			player.Statuses[status] = true;
			callback(player);
		}
	}

	function _removeAlteredStatus(player,status,callback){

		if( player.Statuses[status] ){
			player.Statuses[status] = false;
			callback(player);
		}
	}

// stop status works allright
/**/function _giveStopStatus(player){ _giveAlteredStatus(player, 'Stop', () => { player.Counters.Stop._pTimer = 0; }); }
	function _removeStopStatus(player){ _removeAlteredStatus(player, 'Stop', () => { player.Counters.Stop._pTimer = 0; }); }
	function _callbackStopStatus(player){
		player.Counters.Stop._pTimer++;
		console.log('Still stopped');
		if(player.Counters.Stop._pTimer > player.Counters.Stop.Seconds){ _removeStopStatus(player); }
	}


/**/function _giveRegenStatus(player){_giveAlteredStatus(player,'Regen',()=>{player.Counters.Regen._pTimer=0;});}
	function _removeRegenStatus(player){_removeAlteredStatus(player,'Regen',()=>{player.Counters.Regen._pTimer=0;});}
	function _callbackRegenStatus(player){

		//2 / 8 chance
		if(_return_result_of_probability(25)){
			var regen={		
					value: -(Math.floor(player.Stats.mlif/32)+1),
					type:'c',			
			};
			InflictDamage(player,regen);
		}

		player.Counters.Regen._pTimer++;
		if(player.Counters.Regen._pTimer>player.Counters.Regen.Seconds){_removeRegenStatus(player);}

	}


/**/function _givePoisonStatus(player){_giveAlteredStatus(player,'Poison',()=>{player.Counters.Poison._pTimer=0;});}
	function _removePoisonStatus(player){_removeAlteredStatus(player,'Poison',()=>{player.Counters.Poison._pTimer=0;});}
	function _callbackPoisonStatus(player){

		//1 / 8 chance, approx
		if(_return_result_of_probability(13)){
			var poison={		
					value: Math.floor(player.Stats.mlif/32)+1,
					type:'p',
					attr:'P'
			};
			InflictDamage(player,poison);
		}

		player.Counters.Poison._pTimer++;
		if(player.Counters.Poison._pTimer>player.Counters.Poison.Seconds){_removePoisonStatus(player);}
	}


/**/function _giveReflexStatus(player){_giveAlteredStatus(player,'Reflex',()=>{player.Counters.Reflex._pTimer=0;});}
	function _removeReflexStatus(player){_removeAlteredStatus(player,'Reflex',()=>{player.Counters.Reflex._pTimer=0;});}
	function _callbackReflexStatus(player){
		player.Counters.Reflex._pTimer++;
		if(player.Counters.Reflex._pTimer>player.Counters.Reflex.Seconds){_removeReflexStatus(player);}
	}


/**/function _giveDoomStatus(player){_giveAlteredStatus(player,'Doom',()=>{_appendDoomCounterTo(player,15);});}
	function _removeDoomStatus(player){_removeAlteredStatus(player,'Doom',()=>{RemoveDOM(player.DOM.DoomCounter);});}
	function _callbackDoomStatus(player){

		if(player.DOM.DoomCounter.innerHTML > 0){
			player.DOM.DoomCounter.innerHTML--;
		}else{
			console.log('Doom!');
			//-----------------------------++++++++++++++++++++++++++++++++++++++++++++++++----------------------------
			_removeDoomStatus(player);
		}
		
	}

	function _appendDoomCounterTo(player, num){


		//var s=document.createElement('div');
		//s.className='menulist1';

		/*
		position : relative;
		text-align : center;
		margin : auto;
		color : #D2D2D2;
		font-family : 'FFVIFont';
		font-size : 100%;
		line-height : 220%;
		z-index : 1;
		text-shadow : 0px 3px 2px #000000;
		*/


		/*
		//---------------------------------------------------------
		s.style.width='2em';
		s.style.height='2em';
		s.style.top='-1em'
		s.style.left='0.5em'

		//s.innerHTML=num;
		//player.DOM.Ref.appendChild(s);
		/**/

		player.DOM.DoomCounter = Bridge.DOM.Txt(num, {
			position: 'relative',
			textAlign: 'center',
			color: '#D2D2D2',
			fontFamily: 'FFVIFont',
			fontSize: '100%',
			lineHeight: '220%',
			zIndex: 1,
			textShadow: '0px 3px 2px #000000',

			width: '2em',
			height: '2em',
			top: '-1em',
			left: '0.5em'
		}, player.DOM.Ref);

	}


/**/function _giveSleepStatus(player){_giveAlteredStatus(player,'Sleep',()=>{player.Counters.Sleep._pTimer=0;});}
	function _removeSleepStatus(player){_removeAlteredStatus(player,'Sleep',()=>{player.Counters.Sleep._pTimer=0;});}
	function _callbackSleepStatus(player){

		player.Counters.Sleep._pTimer++;
		console.log('Sleeping');
		if(player.Counters.Sleep._pTimer>player.Counters.Sleep.Seconds){_removeSleepStatus(player);}
		
	}
