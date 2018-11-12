import SceneBattleWrapper from './battleWrapper.js';
import LoadAssets from './asset-loader.js';


export default class ATBBattleScene extends Phaser.Scene {
    constructor ({assets, enemies, players, background, music}) {
        super();
        this.assets = assets;
        this.enemies = enemies || [];
        this.players = players || [];
        this.background = background;
        this.music = music;
    }

    preload (config) { LoadAssets({assets: this.assets, loader: this.load}); }

    create () {
        
        this.Battle = new SceneBattleWrapper({scene: this});
        this.Battle.initialize();

        /*
            this.inputMap.setKeyCommand(40, key => {
                console.log('down'); 
                // all checks necessary
                //this.ATBBattle.Players.current.Menus.current.down()
            });


            this.inputMap.setKeyCommand( Phaser.Input.Keyboard.KeyCodes.A, key => {
                console.log('a',  ); 
                // all checks necessary
                // this.ATBBattle.Players.current.Menus.current.currentItem.command()
                
            });
        /**/

        // this must be updated
        
        
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    update() {
        if (this.Battle.ATBBattle.Stopped) return;
        //this.inputMap.update();
        this.Battle.ATBBattle.update(() => {});
    }

    getBanner() {
        return this.Battle.ATBBattle.banner;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    get Stopped() {
        return this._Stopped;
    }
    set Stopped(v) {
        this._Stopped = v;
    }


    get assets() {
        return this._assets;
    }
    set assets(v) {
        this._assets = v;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


    get ATBBattle() {
        return this._ATBBattle;
    }
    set ATBBattle(v) {
        this._ATBBattle = v;
    }
    /**/

}
