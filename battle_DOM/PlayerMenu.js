class PlayerMenu extends ScrollableMenu {
	constructor(options) {
		options = options || {};

        console.log(options.menuIndex);

        let x = 620;
        let y = GAME.game.height * options.menuIndex / 4;

		let item1 = new PlayerMenuName({text: options.name});
		let item2 = new PlayerMenuName({text: options.getLife() + ' / ' + options.getMana() });
        let item3 = new PlayerMenuName();
        
		
		let MenuOptions = {
            scene: GAME.game,
            width: 300,
            height: GAME.game.height / 4,
            x,
            y,

            cullX: 1,
            cullY: 3,
            items: [
            	[item1], 
            	[item2],
                [item3]
            ]
        };

		super(MenuOptions);

        let atbOptions = {
            color: 0x585231,
            fill: 0xeae019,
            scene: GAME,
            x: -45,
            y: 10,
            parent: item3._DOM
        };

        this.atb = new ATBDOM(atbOptions);

		this.input = {
            keyboard: {
                [Phaser.Keyboard.UP]: {
                    onDown: () => scrollable.up(),
                    debounce: 8
                },
                [Phaser.Keyboard.DOWN]: {
                    onDown: () => scrollable.down(),
                    debounce: 8
                },
                [Phaser.Keyboard.Z]: {
                    onDown: () => scrollable._current.onSelect(),
                    debounce: 8
                }
            }
        };
	}

}

class PlayerMenuName extends MenuItem {
	constructor(options) {

        options = options || {};

        let ItemOptions = {
            scene: GAME.game,
            text: options.text || ''
        };

		super(ItemOptions);
	}
}