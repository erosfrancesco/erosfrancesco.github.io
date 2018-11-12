import buildCharacterSprite from './sprite-utils.js';
import BuildCharacterCommands from './command-build.js';
import CHARACTERS from '../characters/player-enemy.js';
const {Player, Enemy} = CHARACTERS;


function MakeEnemy(battle, options) {

    const {AI, stats, name, boss, commands, sprite, Animations, onDamageType} = options;
    const {Commands, Sprite} = MakeCharacter({commands, sprite, battle});

    const enemy = new Enemy({
        Animations,
        Commands,
        Sprite,
        isBoss: Boolean(boss),
        name,
        stats,
        onDamageType
    });

    enemy.AI = AI;

    return enemy;
}


function MakePlayer(battle, options) {

    const {stats, name, commands, sprite, Animations, onDamageType} = options;
    const {Sprite, Commands} = MakeCharacter({commands, sprite, battle});

    const player = new Player({
        Animations, 
        Commands, 
        Sprite,
        name,
        stats, 
        onDamageType,
        onDamage: () => {
            player.UI.item2.text = player.life + ' / ' + player.mana;
        }
    });

    return player;
}

function MakeCharacter({commands, sprite, battle}) {

    const Commands = BuildCharacterCommands(battle, commands);
    sprite.scene = battle.scene;
    const Sprite = buildCharacterSprite(sprite);

    return {Commands, Sprite};
}

export default { MakeEnemy, MakePlayer };