export default class FightMenu {
	constructor() {
	}
	
	build(configs) {
		// create background
		const {scene, x, y, items} = config;
		this.Background = makeFFVIMenuBackground({scene, width: 200, height: 100, x, y});
		
		// create buttons
		items.forEach((row, rowIndex) => {
			row.forEach((item, colIndex) => {
				const button = makeFFVIButton({scene, x, y, text: item.label});
				// compute position etc...
			});
		});
	}
}


// Some settings
const _backgroundFFVITextureId     = 'FFVIBlueGradient';
const _backgroundFFVITextureWidth  = 16;
const _backgroundFFVITextureHeight = 16;
const _backgroundFFVITextureColor1 = '0x332266'; // ColorMap.colors.aqua
const _backgroundFFVITextureColor2 = '0xAA4496'; // ColorMap.colors.navy


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
const makeFFVIButton = ({scene, x, y, text}) => {
	const txt = scene.add.text(16, 16, text, { fontSize: '32px', fill: '#000' });
	return txt;
};

