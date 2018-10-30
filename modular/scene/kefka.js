import ATBBattleScene from './scene-build.js';
import ENGINE from '../engine/index.js';
const {game} = ENGINE;
import buildCharacterSprite from './sprite-utils.js';

import PLAYERS from '../battles/players/index.js';
let { PLAYERTERRACONFIG, PLAYEREDGARCONFIG, PLAYERLOCKECONFIG, PLAYERSHDOWCONFIG, playerAssets } = PLAYERS;
playerAssets.spritesheet[0].src = './sprites/' + playerAssets.spritesheet[0].src;
const players = [PLAYEREDGARCONFIG, PLAYERLOCKECONFIG, PLAYERSHDOWCONFIG];



import FightAction from '../battle-commands/Fight/index.js';

const AITest = function(options, callback) { callback(); };



const KEFKACONFIG = {
    AI: AITest,
    Animations: {
        entrance: (battle, character, callback) => {

            character.Sprite.y = -200;
            character.tween = battle.scene.tweens.add({
                targets: character.Sprite,
                y: 200,
                ease: 'Sine.Linear',
                duration: 6000,
                onComplete: callback
            });
        }
    },
    commands: [ 'FIGHT' ],
    name: "Kefka",
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
        key: 'kefka',
        slot: 0,
        slotMap: [{x: 50, y: 550}],
        config: {}
    }
};

const assets = {
    baseUrl: '../assets/',
    image: [{
        key: 'kefka',
        src: './sprites/kefka.png'
    }, {
        key: 'background01',
        src: './backgrounds/world_over_heavens.png'
    }],
    spritesheet: playerAssets.spritesheet
};

const enemies = [KEFKACONFIG];
const background = {
    key: 'background01',
    type: 'image'
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