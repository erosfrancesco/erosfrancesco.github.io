class PlayerBattleMenu extends ScrollableMenu {
	constructor(options) {
		options = options || {};

        let {player, battle, game} = options;

        let width = 100;
        let height = 100;
        let x = player.Sprite.x;
        let y = player.Sprite.y - 2 * height / 3;
        let scene = game.game;
        let items = [[]];

        player.Commands.forEach(command => {
            items[0].push(new MenuItem({
                scene,
                text: command.label,
                onSelect: () => { 
                    command.action({player, battle});
                    // reset input
                    // remove this menu
                }
            })
            );
        });

		let MenuOptions = {
            selectable: true,
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
                    debounce: 8
                },
                [Phaser.Keyboard.DOWN]: {
                    onDown: () => this.down(),
                    debounce: 8
                },
                [Phaser.Keyboard.Z]: {
                    onDown: () => this._current.onSelect(),
                    debounce: 8
                }
            }
        };

        GAME.setInput(this.input);
	}

}