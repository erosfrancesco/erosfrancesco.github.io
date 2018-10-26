import BattleBanner from './battle-banner-wrapper.js';

import ENGINE from '../engine/index.js';
const { game, GameUtilities } = ENGINE;

const scene = game.scene.scenes[0];

const a = new BattleBanner({scene});

a.show('Hello\nworld', () => {
    a.showLetters( 'hello world', () => {
        a.showChunks([{

        }, {

        }], () => {
            console.log('All done')
        });
    });
});


