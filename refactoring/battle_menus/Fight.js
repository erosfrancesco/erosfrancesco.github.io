import MenuCursor from './Cursor.js';

export default class FightMenu {
	constructor() {
		this.cullX = 2;
		this.cullY = 2;
		this.Cursor = new MenuCursor({cullX: this.cullX, cullY: this.cullY});
	}
	
	build({scene, x = 0, y = 0, items}) {

		this.x = x;
		this.y = y;

		this.width = 400;
		this.height = 200;

		// create background
		this.Background = makeFFVIMenuBackground({scene, width: this.width, height: this.height, x, y});
		this.items = [[]];
		
		// create buttons
		items.forEach((row, rowIndex) => {
			row.forEach((item, colIndex) => {
				const button = makeFFVIButton({scene, text: item.label});
				button.onSelect = item.onSelect;

				this.Cursor.add(button, rowIndex, colIndex);
				
				const {x, y} = this.computeButtonPosition(button, rowIndex, colIndex);
				button.x = x;
				button.y = y;

			});
		});
	}

	computeButtonPosition(button, rowIndex, colIndex) {
		// compute cursor position
		const {posX, posY, cullX, cullY} = this.Cursor;
		let {x, y, width, height} = this;

		const itemWidth = width / cullX;
		const itemHeight = height / cullY;

		x += itemWidth * rowIndex;
		y += itemHeight * colIndex;

		x -= width / 4;
		y -= height / 4;

		//x -= itemWidth / 8;
		//y += itemHeight / 8;

		return {x, y};
	}

}










// Some settings
const _backgroundFFVITextureId     = 'FFVIBlueGradient';
const _backgroundFFVITextureWidth  = 2;
const _backgroundFFVITextureHeight = 8;
const _backgroundFFVITextureColor1 = "#3949ab"; // ColorMap.colors.aqua
const _backgroundFFVITextureColor2 = "#3d333d"; // ColorMap.colors.navy


// return a FFVI-style background
const makeFFVIMenuBackground = ({ scene, width, height, x, y }) => {

    if (!scene.textures.exists(_backgroundFFVITextureId)) {
        
        const canvas = scene.textures.createCanvas(_backgroundFFVITextureId, _backgroundFFVITextureWidth, _backgroundFFVITextureHeight);
        const grd = canvas.context.createLinearGradient(0, 0, 0, _backgroundFFVITextureHeight);

        grd.addColorStop(0, _backgroundFFVITextureColor1);
        grd.addColorStop(1, _backgroundFFVITextureColor2);

        canvas.context.fillStyle = grd;
        canvas.context.fillRect(0, 0, _backgroundFFVITextureWidth, _backgroundFFVITextureHeight);

        canvas.refresh();
    }

    const background = scene.add.image(x, y, _backgroundFFVITextureId );
    background.setScale(width / _backgroundFFVITextureWidth, height / _backgroundFFVITextureHeight);
    
    return background;
}



// makeFFVIButton
const makeFFVIButton = ({scene, text}) => {
	const sprite = scene.add.text(0, 0, text, { fontSize: '32px', fill: '#000' });
	
	sprite.setOrigin(0.5);
	sprite.setInteractive();

    sprite.on('pointerdown', () => {
        scene.events.emit('button_pressed', sprite);
    });

	scene.physics.world.enable([sprite]);
	return sprite;
};