let ActionStack             = [], 	// actions stack
    IsGraphicReady          = true, // when set to false, ATB time is stopped
    General_Action_Resolver = FIFOAnimation(); // load all action phases to related players

// ActionStack facade
_AddActionToStack = (act) => { ActionStack.push(act); };
_RemoveActionFromStack = () => { ActionStack.shift(); };

// action loop
ActiveActionFlowLoop = () => {
	if (IsGraphicReady && ActionStack[0]) {
	    IsGraphicReady = false;
	    _ExecuteThisAction(ActionStack[0], (performers, targets) => {
	    	// remove action from ActionStack. Here for battle logging or something...
	    	_RemoveActionFromStack();
	    	// reset player ATB
	    	performers.forEach(performer => { ResetATBOf(performer); });
	    	
	    });
	}
};

// good luck sorting this shit out...
_ExecuteThisAction = (act, callback) => {
	General_Action_Resolver.add(() => { 
		
		act.c = 0;
		act.endCount = 0;
			
		IterateForEveryTarget(act.performer, act.targets, act.c, act.setGrahicEfx, () => {
			IterateForEveryTarget(act.performer, act.targets, act.c, act.checkMiss, () => {
				IterateForEveryTarget(act.performer, act.targets, act.c, act.playGraphics, () => {
					IterateForEveryTarget(act.performer, act.targets, act.c, act.calcDamages, () => {
						IterateForEveryTarget(act.performer, act.targets, act.c, act.showDamages, () => {
							IterateForEveryTarget(act.performer, act.targets, act.c, act.end, () => {

								IterateForEveryTarget(act.performer, act.targets, act.c, _CheckDeadPlayers, () => {
									
									act.endCount++;
									if (act.endCount >= act.targets.length) {
										//console.log('Finished');
										IsGraphicReady = true;
										callback(act.performer, act.targets);
									}

								});

							});
						});
					});
				});
			});
		});		
	});
};

IterateForEveryTarget = (player, target, count, fun, cb) => {
				
	if (target[count]) {
		target[count].Clock.add(() => { 
			fun(target[count], player, () => {
			    count++;
			    IterateForEveryTarget(player, target, count, fun, cb);
			});
		});
	}else{
	    count = 0;
	    cb();
	}
};

/*

var act = {

	targets: 		[ player ], // target must always be an array
	performer: 		player,

	reflectable: 	false,
	counterable: 	true,
	
	setGrahicEfx: 	function(target, player, callback){ console.log('Load on: '	, target.Name); callback(); },
	checkMiss: 		function(target, player, callback){ console.log('Check on: ', target.Name); callback(); },
	playGraphics: 	function(target, player, callback){ console.log('Play on: '	, target.Name); callback(); },
	calcDamages: 	function(target, player, callback){ console.log('Calc on: '	, target.Name); callback(); },
	showDamages: 	function(target, player, callback){ console.log('Show on: '	, target.Name); callback(); },
	end	: 			function(target, player, callback){ console.log('End on: '	, target.Name); callback(); },

};
/**/