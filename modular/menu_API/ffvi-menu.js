import FFVIMenuBackground from './ffvi-menu-background.js';
import StylizableMenu from './phaser/menu.js';

export default class FFVIMenu extends StylizableMenu {
	constructor(options) {

		const {
			items,
			cullX, cullY,
			width, height,
			x, y, 
			noArrows, verticalArrows, horizontalArrows, 
			scene, battle
		} = options;

		const background = new FFVIMenuBackground({
			scene, 
			x, y, 
			width, height,
			noArrows, verticalArrows, horizontalArrows
		})

		super({
			items,
			cullX, cullY,
			width, height,
			x, y, 
			noArrows, verticalArrows, horizontalArrows, 
			scene, battle,
			background
		});
	}
}
