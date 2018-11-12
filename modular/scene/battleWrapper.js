import CharacterRegistry from '../battle_utils/character-registry.js';
import PlayerActionRegistry from '../action_manager/index.js';

import PlayerUI from '../battle-ui/player-ui.js'
import BattleWrapper from '../battle_utils/battle-wrapper.js';
import BuildBattleBackground from './battle-background.js';
import FFVIDialog from '../menu_API/ffvi-dialog.js';

import TURNPHASE from '../turn-wrap/turn-events.js';
const {onCharacterTurnStart, onCharacterDeath} = TURNPHASE;

import BUILDER from './character-build.js';
const {MakeEnemy, MakePlayer} = BUILDER;

import UTILS from '../engine/utils.js';
const {deepClone} = UTILS;



export default class SceneBattleWrapper {

    constructor({ scene }) {
        
        // background first
        const {background, music, enemies, players} = scene;

        this.scene = scene;
        this.background = background;
        this.music = music;
        this.enemies = enemies;
        this.players = players;

        // then registries
        const Players = new CharacterRegistry({ characters: [], onAdd: (player, callback) => {

                const UI = new PlayerUI({
                    scene, 
                    player, 
                    sceneHeight: 500, 
                    numberOfPlayers: players.length, 
                    playerIndex: player.playerListIndex
                });

                player.UI = UI;
                callback(player);
            }
        });

        const Enemies = new CharacterRegistry({ characters: [] });




        // and the battle
        this.ATBBattle = new BattleWrapper({ 
            scene,
            Players, 
            Enemies, 
            
            onCharacterUpdate: p => {
                if (!p.isAlly()) return;

                const percentage = 100 * p.TurnSystem.counter / p.TurnSystem.max;
                p.UI.atb.percentage = percentage;
            },

            onCharacterTurn: p => {
                onCharacterTurnStart(p, this.ATBBattle, scene);
            },

            onCharacterDone: p => {
            },

            onCharacterDeath: p => {
                onCharacterDeath(p, this.ATBBattle, scene);
            }
        });

        this.ATBBattle.stop();
        
    }

    initialize() {
        // initialize battle

        // build background
        if (this.background) {
            this.Background = BuildBattleBackground({scene: this.scene, background: this.background});
        }

        // then music
        if (this.music) {
            this.Music = this.scene.sound.add(music.key);
            this.Music.play();
        }
        
        // then all characters
        this.enemies.forEach(enemy => this.makeEnemy(enemy) );
        this.players.forEach(player => this.makePlayer(player) );
        this.ATBBattle.initializeAllCharacters();

        // then the banner
        this.banner = new FFVIDialog({scene: this.scene});

        // then start the battle
        this.ATBBattle.start(this, () => this.ATBBattle.resume() );
    }

    makeEnemy(options) {
        const params = deepClone(options);
        const enemy = MakeEnemy(this.ATBBattle, params);

        enemy.id = 'e - ' + this.ATBBattle.Enemies.length;
        enemy.playerListIndex = this.ATBBattle.Enemies.length;
        this.ATBBattle.Enemies.add(enemy);
    }

    makePlayer(options) {
        const params = deepClone(options);
        const player = MakePlayer(this.ATBBattle, params);

        player.id = 'p - ' + this.ATBBattle.Players.length;
        player.playerListIndex = this.ATBBattle.Players.length;
        player.Actions = new PlayerActionRegistry(player, this.getAnimator());
        this.ATBBattle.Players.add(player);
    }

    getBanner() {
        return this.banner;
    }

    getAnimator() {
        return this.ATBBattle.Animator;
    }
}




    	
        
        