class PlayerBattleMenu extends FFVIText {
	constructor(options) {
		options = options || {};

        let {player, battle, scene} = options;

        let width = 100;
        let height = 100;
        let x = player.Sprite.x;
        let y = player.Sprite.y - 2 * height / 3;
        let items = [[]];

        player.Commands.forEach(command => {
            items[0].push(new MenuItem({
                scene,
                text: command.label,
                onSelect: () => { 
                    console.log('Executing');
                    command.action({player, battle});
                    // reset input
                    
                    // remove this menu
                    this.destroy();
                }
            })
            );
        });

		let MenuOptions = {
            scene,
            items,
            width,
            height,
            x,
            y,

            cullX: 1,
            cullY: 3
        };

		super(MenuOptions);

		this.input = {
            keyboard: {
                [Phaser.Keyboard.UP]: {
                    onDown: () => this.up(),
                    debounce: 2
                },
                [Phaser.Keyboard.DOWN]: {
                    onDown: () => this.down(),
                    debounce: 2
                },
                [Phaser.Keyboard.Z]: {
                    onDown: () => this._current.onSelect(),
                    debounce: 2
                }
            }
        };

        GAME.setInput(this.input);
	}

}