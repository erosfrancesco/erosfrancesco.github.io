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


export default function buildCharacterSprite(options) {

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
