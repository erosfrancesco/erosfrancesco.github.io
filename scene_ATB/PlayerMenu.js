class PlayerMenu {
	constructor(options) {

        let {scene, player} = options;

        let x = 500;
        let y = 300;

        let width = 200;
        let height = 200;

        
        this.item1 = new FFVIText({scene, width, height: 50, x: 0, y: 0, text: player.name});

        this.background = new FFVIMenuBackground({
            scene, 
            x, y, 
            width, height
        });

        this.atb = new ATBPlayerBridge({scene, x: x - 80, y: y - 50, width: 160});
        this.atb.init(player);

        this.wrapper = scene.add.container(x, y);
        this.wrapper.add(this.item1.sprite);
        
        this.atb.bar.on('done', e => console.log('helo'));

        /*
        super({
            scene,
            x: 550,
            y: 250,
            cullX: 3,
            cullY: 3,
            width: 200,
            height: 200,
            items: [[item1, item2]]
        });
        /**/

    
        
        /*
        let x = 620;
        let y = GAME.game.height * player.menuIndex / 4;

		let item1 = new PlayerMenuName({text: player.name});
		let item2 = new PlayerMenuName({text: player.life + ' / ' + player.mana });
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
        /**/


        
        /*
        this.update = () => {
            this._items[1][0].text = player.life + ' / ' + player.mana;
        }
        /**/
	}

}
