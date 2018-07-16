const EnemySimpleImageKey = 'leprechaun';
const EnemyBossImageKey = 'goblin_king_boss';
const BackgroundImageKey = 'backgroundBattle01';

const LEPRECHAUNCONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: "Leprechaun",
    sprite: {
        type: 'image',
        key: 'leprechaun',
        config: {
            scaleX: 0.25,
            scaleY: 0.25
        }
    },
    stats: {
        "str": 50,
        "dex": 4,
        "lvl": 5,
        "lif": 1900,
        "man": 199
    }
};

const KINGGOBLINCONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: "G. King",
    boss: true,
    stats: {
        "str": 50,
        "dex": 4,
        "lvl": 5,
        "lif": 1900,
        "man": 199
    },
    sprite: {
        type: 'image',
        key: 'goblin_king_boss',
        config: {
            scaleX: -0.70,
            scaleY: 0.70
        }
    }
};


function loadBattle01Assets(scene) {

	const EnemyBossImageUrl = '../assets/Goblin_King_Figure.png';
	const EnemySimpleImageUrl = '../assets/Leprechaun.png';
	const BackgroundImageUrl = '../assets/battle_background_01.png';	

    scene.load.image(EnemyBossImageKey, EnemyBossImageUrl);
    scene.load.image(EnemySimpleImageKey, EnemySimpleImageUrl);
    scene.load.image(BackgroundImageKey, BackgroundImageUrl);
}
