// Not good. It will have to be an object
let __CURRENTSLOTINDEXMAP = {};

function computePositionFromSlotMap(slotMap, index) {
 	// compute index
	if (!index && index !== 0) {
		const oldIndex = __CURRENTSLOTINDEXMAP[slotMap];	
		index = (!oldIndex && oldIndex !== 0) ? -1 : oldIndex;
		index++; 
		index %= slotMap.length;
	}

	// save old index
	__CURRENTSLOTINDEXMAP[slotMap] = index;

	return slotMap[index];
};
/////////////////////////////////////////////////////////////////////


export default function buildCharacterSprite (options) {

    let {slot, slotMap, scene, config, type, key, frame } = options;
    let SlotMap = slotMap || [{x: 0, y: 0}];
    let {x, y} = computePositionFromSlotMap(SlotMap, slot);

    let typeOfConfigs = {key};
    if (type === 'sprite') { typeOfConfigs.frame = frame; } // sprite frame

    let o = scene.make[type](typeOfConfigs);

    config = config || {};
    config.originY = config.originY || 0.5;
    config.originX = config.originX || 0.5;
    Object.keys(config).forEach(key => { o[key] = config[key]; });

    let width = o.displayWidth;
    let height = o.displayHeight;

    o.x = x + width / 2;
    o.y = y - height;

    return o;
}

/////////////////////////////////////////////////////////////////////////////
/*
/////////////////////////////////////////////////////////////////////////////

function MakeEnemy(scene, battle, options) {

    let {commands, stats, sprite, name, boss, Animations, onDamageType} = options;
    sprite.scene = scene;

    sprite.boss = boss || false;

    let enemy = new Enemy({
        commands: BuildCharacterCommands(scene, battle, commands),
        isBoss: Boolean(boss),
        name,
        sprite: buildCharacterSprite(sprite),
        stats,
        onDamageType
    });

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
        onDamageType
    });

    return player;
}

/////////////////////////////////////////////////////////////////////////////
/**/