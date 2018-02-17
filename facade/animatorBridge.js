/*
	Basically, a State Machine that can manage the update() function.

	When the run method is called, check the state of every function loaded and execute all function that are Active
	Inactive functions are still loaded, but not executed.
	Use toggle method to toggle the state of the desired function.

*/

CiclicStateMachine = () => {

	let StateMachine = {
		Pool: [],
		
		/*	Method assign:
		
			Store in the machine the fun [Function] with id [String].
			Set dontstartyet parameter to true if you don't want to run the new function, otherwise don't set it.
			Use run to execute the stored functions that are Active.
		*/
		assign: (id, fun, dontstartyet) => { StateMachine.Pool[id] = [ fun, dontstartyet ? false : true ]; }, // array should be more performant

		/*	Method remove:
		
			Remove a loaded function. Pass the id of the function.
		*/
		remove: (id) => { delete StateMachine.Pool[id]; },

		/*	Method run:
		
			Execute all the function of the machine that are Active. Loop this in the game cicle and you're ready to groove.
		*/
		run: () => { 
			Object.keys(StateMachine.Pool).map(( key, indx ) => { 
				StateMachine.Pool[key][1] ? StateMachine.Pool[key][0]() : false 
			}); 
		},

		/*	Method exist:
		
			Return the object stored under id: [ Function, Boolean ]
			Return false if there's no object stored with the id.
		*/
		exist: (id) => { return ( StateMachine.Pool[id] || false ); },

		/*	Method stateOf:
		
			Return the current state of the function stored with id.
			Return false if there's no object stored with id.
		*/
		stateOf: (id) => { return ( StateMachine.exist(id)[1] || false ); },

		/*	Method toggle:
		
			Pretty self-explanatory. Toggle the state of the function stored with id.
			State possible = [Active, Inactive]
		*/
		toggle: (id) => { StateMachine.exist(id) ? StateMachine.exist(id)[1] = !StateMachine.exist(id)[1] : false; },

		iterator: (iter) => { Object.keys(StateMachine.Pool).forEach( id => { iter(id, StateMachine.Pool[id]); }); }

	};

	return StateMachine;
}


PauseMachine = (machine) => {
	
	machine.Fool = [];
	Object.keys(machine.Pool).forEach( id => { machine.Fool[id] = machine.Pool[id][1]; machine.Pool[id][1] = false; });
	machine.Pool['PAUSE OVERRIDE FUNCTION'][1] = true; // this must always be true.
	machine.Paused = true;
}

ResumeMachine = (machine) => {

	Object.keys(machine.Fool).forEach( id => { machine.Pool[id][1] = machine.Fool[id]; });
	machine.Fool = [];
	machine.Pool['PAUSE OVERRIDE FUNCTION'][1] = true; // this must always be true.
	machine.Paused = false;
}



FIFOAnimation = (isNotActiveYet) => {

	let FIFOAnimation = {
		
		Pool: [],
		active: isNotActiveYet ? false : true,

		execute: () => { FIFOAnimation.Pool[0](); FIFOAnimation.Pool.shift(); },

		update: () => { ( Boolean(FIFOAnimation.Pool.length) && FIFOAnimation.active ) ? FIFOAnimation.execute() : false },

		addFunction: (fun) => { if(typeof fun === 'function'){ FIFOAnimation.Pool.push(fun); } },

		add: (obj) => { 
			(typeof obj === 'array') ? obj.forEach( fun => { FIFOAnimation.addFunction(fun); }) : FIFOAnimation.addFunction(obj) 
		},



	};

	return FIFOAnimation;
}



