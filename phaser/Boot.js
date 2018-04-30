// game settings
setGameSettings = (GameObj) => {

    // remove scrollbars
    document.body.style.overflow = 'hidden';

     // Pause if the game loses focus.
    GameObj.stage.disableVisibilityChange = true;
    
     // center
    GameObj.scale.pageAlignHorizontally = true;
    GameObj.scale.pageAlignVertically = true;

    //  Mobile settings.
    if (!GameObj.device.desktop) {
        // scale the game no lower than 480x260 and no higher than 1024x768
        GameObj.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        GameObj.scale.setMinMax(480, 260, 1024, 768);
        GameObj.scale.forceLandscape = true;
    }
}


// Boot scene
GAME.addScene('Boot', {
    preload: () => {
        // base settings
        setGameSettings(GAME.game);  
    },

    create: () => {
        GAME.playScene('Preloader');
    }
});