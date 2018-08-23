import ATBPlayerBar from './atb-bar.js';
import PlayerUI from './player-ui.js';

//
/*
import Character from '../battle_stats/character.js';
import AtbBattle from '../battle_utils/atb-battle.js';
import CharacterRegistry from '../battle_utils/character-registry.js';
import ENGINE from '../engine/index.js';

let { game, GameUtilities } = ENGINE;


/*
let a = new Character({name: 'lol'});
let b = new Character({name: 'lol', ally: true});


let Players = new CharacterRegistry();
let Enemies = new CharacterRegistry();
Players.add(a);
Players.add(b);


let scene = game.scene.scenes[0];
let player = new Character({
    name: 'lolly', 
    stats: {
        'life': 100,
        'damage': 4,
        'mana': 2,
        'usedMana': 2
    }
});
let sceneHeight = game.config.height;
let numberOfPlayers = 2;
let playerIndex = 1;


let test = new PlayerUI({
    scene, 
    player, 
    sceneHeight, 
    numberOfPlayers, 
    playerIndex, 
    onBarLoaded: () => { console.log('hello world'); } 
});
test.atb.percentage = 0;


let t = new AtbBattle({Players, Enemies, onCharacterUpdate: p => {
        if (!p.isAlly()) return;

        let percentage = 100 * p.TurnSystem.counter / p.TurnSystem.max;
        test.atb.percentage = percentage;        
    }
});

setInterval(() => t.update(() => { }), 30);

/**/