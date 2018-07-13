const FFVICastSpritesheetKey = 'FFVICastSprites';
const FFVICastSpritesheetUrl = '../assets/ffviCast.png';


function loadFFVICast(scene) {
    scene.load.spritesheet(FFVICastSpritesheetKey, FFVICastSpritesheetUrl, { frameWidth: 680 / 4, frameHeight: 756 / 4 });
}


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
