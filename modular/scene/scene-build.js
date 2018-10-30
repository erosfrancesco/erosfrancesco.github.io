import CharacterRegistry from '../battle_utils/character-registry.js';
import PlayerUI from '../battle-ui/player-ui.js'
import BattleWrapper from '../battle_utils/battle-wrapper.js';
import TURNPHASE from './turn-wrapper.js';
const {onCharacterTurn, onCharacterDeath} = TURNPHASE;

import LoadAssets from './asset-loader.js';

import BUILDER from './character-build.js';
const {MakeEnemy, MakePlayer} = BUILDER;

import BuildBattleBackground from './battle-background.js';

import UTILS from '../engine/utils.js';
const {deepClone} = UTILS;



export default class ATBBattleScene extends Phaser.Scene {
    constructor (config) {
        super();
        let {assets, enemies, players, background, music} = config;
        this.assets = assets;
        this.enemies = enemies || [];
        this.players = players || [];
        this.background = background;
        this.music = music;
    }

    preload (config) { LoadAssets({assets: this.assets, loader: this.load}); }

    create () {

        // background first
        if (this.background) { 
            this.background = BuildBattleBackground({scene: this, background: this.background});
        }

        // then music
        if (this.music) {
            let backgroundMusic1 = this.sound.add(this.music.key);
            backgroundMusic1.play();
        }

        // then the characters
        this.playerList = [];
        this.enemyList = []; 

        this.enemies.forEach(enemy => this.makeEnemy(enemy) );
        this.players.forEach(player => this.makePlayer(player) );


    	// and the battle
        this.ATBBattle = new BattleWrapper({ 
            scene: this,
            Players: new CharacterRegistry({
                characters: this.playerList,
                onAdd: (player, callback) => {

                    const UI = new PlayerUI({
                        scene: this, 
                        player, 
                        sceneHeight: 500, 
                        numberOfPlayers: this.playerList.length, 
                        playerIndex: player.playerListIndex
                    });

                    player.UI = UI;
                    callback(player);
                }
            }), 
            Enemies: new CharacterRegistry({characters: this.enemyList}), 
            
            onCharacterUpdate: p => {
                if (!p.isAlly()) return;

                const percentage = 100 * p.TurnSystem.counter / p.TurnSystem.max;
                p.UI.atb.percentage = percentage;
            },

            onCharacterTurn: p => {
                onCharacterTurn(p, this.ATBBattle, this);
            },

            onCharacterDone: p => {
            },

            onCharacterDeath: p => {
                onCharacterDeath(p, this.ATBBattle, this);
            }
        });
        
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
        this.ATBBattle.stop();
        this.ATBBattle.start(() => this.ATBBattle.resume() );
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    update() {
        if (this.ATBBattle.Stopped) return;
        //this.inputMap.update();
        this.ATBBattle.update(() => {});
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


    get enemyList() {
        return this._enemyList;
    }
    set enemyList(v) {
        this._enemyList = v;
    }


    get playerList() {
        return this._playerList;
    }
    set playerList(v) {
        this._playerList = v;
    }


    makeEnemy(options) {
        const params = deepClone(options);
        const enemy = MakeEnemy(this, this.ATBBattle, params);
        enemy.id = 'e - ' + this.enemyList.length;
        enemy.playerListIndex = this.enemyList.length;
        this.enemyList.push(enemy);
    }

    makePlayer(options) {
        const params = deepClone(options);
        const player = MakePlayer(this, this.ATBBattle, params);
        player.id = 'p - ' + this.playerList.length;
        player.playerListIndex = this.playerList.length;
        this.playerList.push(player);
    }

}
