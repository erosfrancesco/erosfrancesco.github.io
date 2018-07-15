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
