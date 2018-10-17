// import modules (es6)

import FFVIMenuBackground from './ffvi-menu-background.js';
import FFVIText from './ffvi-text.js';
import FFVIMenu from './ffvi-menu.js';

import MenuRegistry from './logic/registry.js';
import ENGINE from '../engine/index.js';
const { game, KeyMapper, GameUtilities } = ENGINE;

export default { game, KeyMapper, GameUtilities, FFVIMenu, MenuRegistry, FFVIText, FFVIMenuBackground };

/*
const button1 = new FFVIText({
    scene: game.scene.scenes[0], 
    text: 'Option1', 
    x: -100, y: 200, 
    width: 250, height: 50
});


// test
const a = new FFVIMenu({
	scene: game.scene.scenes[0],
	x: 400,
    y: 300,
    width:  500,
    height: 300,
    cullX: 1,
    cullY: 1,
    horizontalArrows: true,
    verticalArrows: true,
    items: [ [button1] ]
});
/**/
