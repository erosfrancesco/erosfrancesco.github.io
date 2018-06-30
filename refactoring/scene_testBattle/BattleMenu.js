class PlayerBattleMenu extends FFVIMenu {
	constructor(options) {

        let {player, scene} = options;

        let width = 100;
        let height = 100;
        let x = 100; //player.Sprite.x;
        let y = 100; //player.Sprite.y - 2 * height / 3;
        let items = [[]];


        player.Commands.forEach(command => {


            let menu = new FFVIText({
                    scene,
                    text: command.label,
                    onSelect: () => { 
                        console.log('Executing');
                        command.action({player});
                        // reset input
                        
                        // remove this menu
                        this.destroy();
                    }
            });

            menu.onSelect = () => {
                        console.log('Executing');
                        command.action({player, battle: this});
                        // reset input
                        
                        // remove this menu
                        menu.destroy();
            };


            //  scene, text, x, y, width, height
            items[0].push( menu );
        });

		let MenuOptions = {
            //selectable: true,
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
        
        /*
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
        /**/
	}

}