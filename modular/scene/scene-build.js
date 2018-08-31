import CharacterRegistry from '../battle_utils/character-registry.js';
import PlayerUI from '../battle-ui/player-ui.js'
import AtbBattle from '../battle_utils/atb-battle.js';
import SetBattleTurn from '../battle_utils/turn-phase.js';


import LoadAssets from './asset-loader.js';

import BUILDER from './character-build.js';
let {MakeEnemy, MakePlayer} = BUILDER;

import BuildBattleBackground from './battle-background.js';

import UTILS from '../engine/utils.js';
let {deepClone} = UTILS;

import BattleKeyInput from './key-input.js';




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
        this.ATBBattle = new AtbBattle({ 
            scene: this,
            Players: new CharacterRegistry({
                characters: this.playerList,
                onAdd: (player, callback) => {

                    let UI = new PlayerUI({
                        scene: this, 
                        player, 
                        sceneHeight: 500, 
                        numberOfPlayers: this.playerList.length, 
                        playerIndex: player.playerListIndex
                    });
                    UI.atb.percentage = 0;

                    player.UI = UI;
                    callback(player);
                }
            }), 
            Enemies: new CharacterRegistry({characters: this.enemyList}), 
            
            onCharacterUpdate: p => {
                if (!p.isAlly()) return;

                let percentage = 100 * p.TurnSystem.counter / p.TurnSystem.max;
                p.UI.atb.percentage = percentage;
            },

            onCharacterTurn: p => {
                if (p.isAlly()) {
                    // build turn
                    p.Menus.add( SetBattleTurn(p, this.ATBBattle, this) );
                }
                console.log('character ' + p.name + ' turn!');
            },

            onCharacterDone: p => {
                console.log('character ' + p.name + ' is ready!');
            }
        });


        // BattleKeyInput
        this.inputMap = new BattleKeyInput({scene: this, battle: this.ATBBattle, debounce: 4});
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

       

    }

    update() {
        if (this.Stopped) return;
        this.inputMap.update();
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
        let params = deepClone(options);
        let enemy = MakeEnemy(this, this.ATBBattle, params);
        enemy.id = 'e - ' + this.enemyList.length;
        //player.playerListIndex = this.playerList.length;
        this.enemyList.push(enemy);
    }

    makePlayer(options) {
        let params = deepClone(options);
        let player = MakePlayer(this, this.ATBBattle, params);
        player.id = 'p - ' + this.playerList.length;
        player.playerListIndex = this.playerList.length;
        this.playerList.push(player);
    }


    initBattle() {
        this.ATBBattle.addCharacters(this.playerList, this.enemyList);
        this.ATBBattle.init();
    }
}
