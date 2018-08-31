// Character has been moved
import AtbBattle from './atb-battle.js';
import Character from '../battle_stats/index.js';
import CharacterRegistry from './character-registry.js';


let a = new Character({name: 'lol'});
let b = new Character({name: 'lol', ally: true});


let Players = new CharacterRegistry();
let Enemies = new CharacterRegistry();
Players.add(a);
Players.add(b);

console.log( Players );


let t = new AtbBattle({Players, Enemies});

setInterval(() => {
	//t.forAllCharacters(c => {c.TurnSystem.update();});
	t.update(() => { });
}, 30);