import CHARACTER from '../character_system/index.js';
const {CharacterRegistry, Character} = CHARACTER;

import ACTIONS from '../action_system/index.js';
const {ActionRegistry, TurnActionRegistry} = ACTIONS;

import DAMAGE from '../damage_system/index.js';
const {BattleDamage} = DAMAGE;

const stats = {
	'life': 40,
	'mana': 10, 
	'level': 5,
	'dexterity': 4,
	'strength': 10,
	'defense': 5,
	'intelligence': 3
};

const executor = new Character({name: 'executor', stats});
const target = new Character({name: 'target', stats});

// action registry
const animator = new ActionRegistry();
setInterval(() => animator.resolve(), 30);


// bridge
executor.AnimatorBridge = new TurnActionRegistry(executor, animator);

setTimeout(() => {
	executor.AnimatorBridge.add({
		executor,
		targets: [target],
		resolve: (t, e, callback) => {
			// it works
			t.damage = new BattleDamage({value, physical: true, piercing: true});
			// 'piercing', 'blunt', 'slashing', 'physical', 'magical'
			t.forEach(target => console.log( "target: " + target.life ) );
			//e.Stats.set("damage", 10);
			console.log("executor: ", e.Stats.get("life"));
			callback();
		}
	});

	executor.AnimatorBridge.execute();
}, 1000);
