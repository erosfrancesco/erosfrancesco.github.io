class PlayerBattleMenu extends FFVIMenu {
	constructor(options) {

        let {player, scene, battle} = options;      

        let width = 150;
        let height = 75;

        let spriteHeight = player.Sprite.displayHeight;
        let spriteX = player.Sprite.x;
        let spriteY = player.Sprite.y;


        let x = spriteX;
        let y = spriteY - 2 * spriteHeight / 3;
        let items = [[]];

        player.Commands.forEach(command => {



            let text = command.label;
            let menuItem = new FFVIText({ scene, text });

            // build action
            menuItem.onSelect = options => {
                options = options || {};

                options.player = player;
                options.battle = battle;
                command.action(options);
            }

            items[0].push( menuItem );
        });

		let MenuOptions = {
            scene,
            battle,
            items,
            width,
            height,
            x,
            y,
            horizontalArrows: true
        };

		super(MenuOptions);

        this.battle = battle;
	}



}