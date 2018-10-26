import buildCharacterSprite from './sprite-utils.js';
import BuildCharacterCommands from './command-build.js'
import CHARACTERS from '../characters/player-enemy.js';
let {Player, Enemy} = CHARACTERS;


function MakeEnemy(scene, battle, options) {

    let {AI, commands, stats, sprite, name, boss, Animations, onDamageType} = options;
    sprite.scene = scene;

    sprite.boss = boss || false;

    let enemy = new Enemy({
        Animations,
        commands: BuildCharacterCommands(scene, battle, commands),
        isBoss: Boolean(boss),
        name,
        sprite: buildCharacterSprite(sprite),
        stats,
        onDamageType
    });

    enemy.AI = AI;

    return enemy;
}

function MakePlayer(scene, battle, options) {

    let {commands, stats, sprite, name, Animations, onDamageType} = options;
    sprite.scene = scene;

    let player = new Player({
        commands: BuildCharacterCommands(scene, battle, commands),
        name,
        sprite: buildCharacterSprite(sprite),
        stats, 
        Animations,
        onDamageType,
        onDamage: () => {
            player.UI.item2.text = player.life + ' / ' + player.mana;
        }
    });

    return player;
}


export default { MakeEnemy, MakePlayer };