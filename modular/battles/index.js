import ENGINE from '../engine/index.js';
let {game} = ENGINE;

import ATBBattleScene from '../scene/scene-build.js';

import BATTLECONFIGS from './test.js';
let {assets, enemies, music, background} = BATTLECONFIGS;

import PLAYERS from './players/index.js';
let { PLAYERTERRACONFIG, PLAYEREDGARCONFIG, PLAYERLOCKECONFIG, PLAYERSHDOWCONFIG, playerAssets } = PLAYERS;


// merge playerAssets and assets
Object.keys(playerAssets).forEach(type => {
	assets[type] = assets[type] || [];
	let thisTypeOfAssets = playerAssets[type];
	thisTypeOfAssets.forEach(a => {
		assets[type].push(a);
	}); 
});

const players = [PLAYERTERRACONFIG, PLAYEREDGARCONFIG, PLAYERLOCKECONFIG, PLAYERSHDOWCONFIG];

function BuildScene() { return new ATBBattleScene({
    assets, 
    music,
    enemies, 
    players, 
    background
}); }

game.scene.add('battle', BuildScene, true);
/**/