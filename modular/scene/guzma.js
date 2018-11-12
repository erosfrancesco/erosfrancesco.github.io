import ATBBattleScene from './scene-build.js';
import ENGINE from '../engine/index.js';
const {game} = ENGINE;
import buildCharacterSprite from './sprite-utils.js';

import PLAYERS from '../battles/players/index.js';
let { PLAYERTERRACONFIG, PLAYEREDGARCONFIG, PLAYERLOCKECONFIG, PLAYERSHDOWCONFIG, playerAssets } = PLAYERS;
playerAssets.spritesheet[0].src = './sprites/' + playerAssets.spritesheet[0].src;
const players = [PLAYEREDGARCONFIG, PLAYERLOCKECONFIG, PLAYERSHDOWCONFIG];



import FightAction from '../battle-commands/Fight/animation-fight.js';

const AITest = function(options, callback) {
    let {character, battle} = options;

    character = battle.Enemies.current;

    const pointer = battle.Enemies.findIndex(enemy => enemy.id === character.id);
    const registry = battle.Enemies;

    character.Actions = new FightAction({executor: { pointer, registry }, battle, 
        onDone: () => { console.log('guzma done'); }
    });

    character.Actions.targets = [{
        pointer: battle.Players.randomIndex(),
        registry: battle.Players
    }];

    /*
    
    character.Actions = new FightAction({executor: {
        pointer, //: battle.Enemies.randomIndex(),
        registry: battle.Enemies
    }, battle, onDone: () => {
        //console.log('done attacking');
    }});

    character.Actions.targets = [{
        pointer: battle.Players.randomIndex(),
        registry: battle.Players
    }];
    /**/

    callback();
};


const entrance = (battle, character, callback) => {
    console.log(battle);
    battle.getBanner().parse("<letter>Let's go!</letter>", callback);
}

const GUZMACONFIG = {
    AI: AITest,
    Animations: { entrance },
    commands: [ 'FIGHT' ],
    name: "Guzma",
    boss: true,
    stats: {
        "str": 50,
        "def": 21,
        "dex": 5,
        "lvl": 3,
        "lif": 1700,
        "man": 38
    },
    sprite: {
        type: 'image',
        key: 'guzma',
        slot: 0,
        slotMap: [{x: 100, y: 600}],
        config: {
            scaleX: 0.70,
            scaleY: 0.70
        }
    }
};

const assets = {
    baseUrl: '../assets/',
    image: [{
        key: 'guzma',
        src: './sprites/Guzma.png'
    }, {
        key: 'background01',
        src: './backgrounds/hip_hop_streets.png'
    }],
    spritesheet: playerAssets.spritesheet
};

const enemies = [GUZMACONFIG];
const background = {
    key: 'background01',
    type: 'image',
    config: {
        scaleX: 0.5,
        scaleY: 0.5
    }
};


function BuildScene() { 
    return new ATBBattleScene({
        assets, 
        enemies, 
        players, 
        background
    }); 
}

game.scene.add('battle', BuildScene, true);
/**/