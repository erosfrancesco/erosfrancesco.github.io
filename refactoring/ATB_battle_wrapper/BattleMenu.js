class PlayerBattleMenu extends FFVIMenu {
	constructor(options) {

        let {player, scene} = options;

        let width = 100;
        let height = 100;
        let x = 100; //player.Sprite.x;
        let y = 100; //player.Sprite.y - 2 * height / 3;
        let items = [[]];


        player.Commands.forEach(command => {

            let menuItem = new FFVIText({
                scene,
                text: command.label
            });

            menuItem.onSelect = () => { 
                command.action({player});
            }


            //  scene, text, x, y, width, height
            items[0].push( menuItem );
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
	}



}