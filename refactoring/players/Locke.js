class Locke extends Player {
	constructor(options) {

		let {scene, battle, configs} = options;

		super(configs);
		this.Commands = [
            new FightCommand({battle, scene}),
            new ItemsCommand({battle, scene})
        ];
        this.Sprite = makePlayerSpriteFromConfig(scene, configs.spriteKey, configs.x, configs.y);
        this.name = 'Locke';
	}
}


const PLAYERLOCKECONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: 'Locke',
    sprite: {
        type: 'sprite',
        key: 'FFVICast', 
        frame: 2,
        slotMap: slotMaps.players,
        config: {
            scaleX: 1.1,
            scaleY: 1.1
        }
    },
    stats: {
        "str": 5,
        "dex": 4,
        "lvl": 5,
        "lif": 100,
        "man": 19
    }
};