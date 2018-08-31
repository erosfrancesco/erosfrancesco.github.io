import ATBPlayerBar from './atb-bar.js';
import PlayerUI from './player-ui.js';

//

import Character from '../scene/character.js';
import AtbBattle from '../battle_utils/atb-battle.js';
import CharacterRegistry from '../battle_utils/character-registry.js';
import ENGINE from '../engine/index.js';

let { game, GameUtilities } = ENGINE;



let a = new Character({
    name: 'hìdhu',
    ally: true, 
    stats: {
        'life': 100,
        'dexterity': 3
    }
});
let b = new Character({
    name: 'lolly', 
    ally: true, 
    stats: {
        'life': 100
    }
});


let Players = new CharacterRegistry({characters: [a, b]});
let Enemies = new CharacterRegistry();


let scene = game.scene.scenes[0];

let sceneHeight = game.config.height;
let numberOfPlayers = 2;


a.UI = new PlayerUI({
    scene, 
    player: a, 
    sceneHeight, 
    numberOfPlayers, 
    playerIndex: 0
});
a.UI.atb.percentage = 0;


b.UI = new PlayerUI({
    scene, 
    player: b, 
    sceneHeight, 
    numberOfPlayers, 
    playerIndex: 1
});
b.UI.atb.percentage = 0;


let t = new AtbBattle({
    Players, 
    Enemies, 
    
    onCharacterUpdate: p => {
        if (!p.isAlly()) return;

        let percentage = 100 * p.TurnSystem.counter / p.TurnSystem.max;
        p.UI.atb.percentage = percentage;
    },

    onCharacterTurn: p => {
        console.log('character ' + p.name + ' is ready!');
    },
    
    onCharacterDone: p => {
        console.log('turn on ', p.name);
        ///*
        t.Animator.add({
            resolve: callback => {
                console.log('2 second action');
                setTimeout( callback, 2000);
                
            }
        });
        /**/
    }
});

setInterval(() => t.update(() => { }), 30);

/**/