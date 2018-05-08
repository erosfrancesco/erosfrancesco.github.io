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


// Boot scene
GAME.addScene('Preloader', {
    preload: () => {
        // set physic engine
        GAME.game.physics.startSystem(Phaser.Physics.ARCADE);

        // load assets for Loading scene...
        GAME.load.image('starfield', '../assets/starfield.png');
        GAME.load.image('mainLogo', '../assets/MainLogo.png');
    },

    create: () => {

        let back = GAME.add.tileSprite(0, 0, GAME.game.width, GAME.game.height, 'starfield');
        back.autoScroll(10, 20);

        let splash = GAME.add.sprite(GAME.world.centerX, GAME.world.centerY - 70, 'mainLogo');
        splash.anchor.x = 0.5;
        splash.anchor.y = 0.5;
        splash.scale.setTo(0.5, 0.5);

        /**************************************/

        let MenuItem1 = new MenuItem({
            scene: GAME.game,
            text: 'Start Game',
            onSelect: () => { console.log('New game'); }
        });
        let MenuItem2 = new MenuItem({
            scene: GAME.game,
            text: 'Load Game',
            onSelect: () => { console.log('Load game'); }
        });

        let MenuOptions = {
            scene: GAME.game,
            width: 300,
            height: 100,
            x: 300,
            y: 350,

            selectable: true,

            cullX: 1,
            cullY: 2,
            items: [[MenuItem1], [MenuItem2]]
        };

        /**************************************/

        let scrollable = new ScrollableMenu(MenuOptions);

        GAME.setInput({
            keyboard: {
                [Phaser.Keyboard.UP]: {
                    onDown: () => scrollable.up(),
                    debounce: 8
                },
                [Phaser.Keyboard.DOWN]: {
                    onDown: () => scrollable.down(),
                    debounce: 8
                },
                [Phaser.Keyboard.Z]: {
                    onDown: () => scrollable._current.onSelect(),
                    debounce: 8
                }
            }
        });
    },

    update: () => {

       
        
    }
});
