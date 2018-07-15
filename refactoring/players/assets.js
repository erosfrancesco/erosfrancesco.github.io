const FFVICastSpritesheetUrl = '../assets/ffviCast.png';
const FFVICastSpritesheetKey = 'FFVICastSprites';

const PlayersJSONMap = {
    terra: {
        key: FFVICastSpritesheetKey,
    },

    morphedTerra: {
        key: FFVICastSpritesheetKey,
        frame: 1
    },

    locke: {
        key: FFVICastSpritesheetKey,
        frame: 2
    },

    edgar: {
        key: FFVICastSpritesheetKey,
        frame: 3
    },

    shadow: {
        key: FFVICastSpritesheetKey,
        frame: 4
    },
};


function makePlayerSpriteFromConfig(scene, name, x, y) {
    let json = PlayersJSONMap[name];
    json.x = x;
    json.y = y;
    json.originY = 0.5;
    json.originX = 0.5;
    return scene.make.sprite(json);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadFFVICast(scene) {    
    scene.load.spritesheet(FFVICastSpritesheetKey, FFVICastSpritesheetUrl, { frameWidth: 680 / 4, frameHeight: 756 / 4 });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadBattle01Assets(scene) {
	const EnemyBossImageUrl = '../assets/Goblin_King_Figure.png';
	const EnemyBossImageKey = 'goblin_king_boss';

	const EnemySimpleImageUrl = '../assets/Leprechaun.png';
	const EnemySimpleImageKey = 'leprechaun';

	const BackgroundImageUrl = '../assets/battle_background_01.png';
	const BackgroundImageKey = 'backgroundBattle01';

    scene.load.image(EnemyBossImageKey, EnemyBossImageUrl);
    scene.load.image(EnemySimpleImageKey, EnemySimpleImageUrl);
    scene.load.image(BackgroundImageKey, BackgroundImageUrl);
}



