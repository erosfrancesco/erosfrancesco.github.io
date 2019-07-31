export default {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 900,
    height: 500,
    // transparent: true,
    physics: {
        default: 'matter',
        matter: {
            //debug: true,
            gravity: { y: 0 }
        }
    }
};