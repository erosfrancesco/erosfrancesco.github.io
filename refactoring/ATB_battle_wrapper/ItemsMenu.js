class ItemsMenu extends FFVIMenu {
	constructor(options) {

        let {scene, battle } = options; 

        let items = [[
            {label: 'hello'}
        ]];

        let MenuOptions = {
            scene,
            battle,
            items,
            width: 400,
            height: 200,
            x: 400,
            y: 250,
            verticalArrows: true,
            horizontalArrows: true
        };

        super(MenuOptions);

        this.battle = battle;
        /*
            this.computeItemSize(t, colIndex, rowIndex);
            this.computeItemPosition(t, colIndex, rowIndex);
            this.computeItemVisibility(t, colIndex, rowIndex);
        */

	}

}
