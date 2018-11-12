import AtbBattle from './atbBattle.js';

export default class BattleScene extends Phaser.Scene {
    constructor() {  

        super({key: "Battle"});
      
        this.battle = new AtbBattle({
            onWin: () => {
                console.log("I win!");
                this.battle.stop();
            }, 
            onLose: () => {
                console.log("I lost...");
                this.battle.stop();
            }, 
            onCharacterTurn: (current, callback) => {
                //this.battle.Players.remove(p => p.name === "pg");
                //this.battle.Enemies.remove(p => p.name === "bd");
                //console.log('ok from battle', current.name);
                callback();
            }
        }); 


        this.battle.stop();
    }


    create() {
        const stats = {
            'life': 40,
            'mana': 10, 
            'level': 5,
            'dexterity': 4,
            'strength': 10,
            'defense': 5,
            'intelligence': 3
        };

        let a = 0;

        const Animations = {
            "entering": (character) => {
                const {Sprite} = character;
                Sprite.__trmblePhaserTween = Sprite.scene.tweens.add({
                    targets: Sprite,
                    x: Sprite.x - 400,
                    ease: 'Linear',
                    duration: 200,
                    onComplete: () => {
                        a--;
                        if (!a) {
                            console.log("booya");
                        }
                        delete Sprite.__trmblePhaserTween;
                    }
                });
            }
        };

        const sprite0 = this.add.sprite('', 10, 40);
        const sprite1 = this.add.sprite('', 10, 40);
        const sprite2 = this.add.sprite('', 10, 40);
        const sprite3 = this.add.sprite('', 10, 40);

        sprite0.x = 550 + 400;
        sprite1.x = 650 + 400;
        sprite2.x = 750 + 400;
        sprite3.x = 850 + 400;

        sprite0.y = 100;
        sprite1.y = 200;
        sprite2.y = 300;
        sprite3.y = 400;

        this.battle.makePlayer({name: 'pg1', stats, Animations, Sprite: sprite0});
        this.battle.makePlayer({name: 'pg2', stats, Animations, Sprite: sprite1});
        this.battle.makePlayer({name: 'pg1', stats, Animations, Sprite: sprite2});
        this.battle.makePlayer({name: 'pg2', stats, Animations, Sprite: sprite3});

        a = 4;
    }

    update() {
        this.battle.update();
    }
}
