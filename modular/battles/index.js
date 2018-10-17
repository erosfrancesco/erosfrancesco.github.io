import ENGINE from '../engine/index.js';
const {game} = ENGINE;

import ATBBattleScene from '../scene/scene-build.js';

import BATTLECONFIGS from './final.js'; 
//import BATTLECONFIGS from './test.js';
const {assets, enemies, music, background} = BATTLECONFIGS;

import PLAYERS from './players/index.js';
const { PLAYERTERRACONFIG, PLAYEREDGARCONFIG, PLAYERLOCKECONFIG, PLAYERSHDOWCONFIG, playerAssets } = PLAYERS;


// merge playerAssets and assets
Object.keys(playerAssets).forEach(type => {
	assets[type] = assets[type] || [];
	const thisTypeOfAssets = playerAssets[type];
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