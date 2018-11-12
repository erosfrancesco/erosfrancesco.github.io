import FFVIMenuBackground from '../../menu_API/ffvi-menu-background.js';
import FFVIText from '../../menu_API/ffvi-text.js';
import StylizableDialog from './phaser/stylizable-dialog.js';

//
const computeArea = ({scene}) => {
    return { width: (700 - 100), height: 100 }
}

//
const computePosition = ({scene}) => {
    return { x: (100 - 100 / 2), y: 10 };
}


export default class FFVIDialog extends StylizableDialog {
	constructor({scene}) {

        // get height and width from scene...
        const { width, height } = computeArea({scene});
        
        let { x, y } = computePosition({scene});
        x += width / 2;
        y += height / 2;

        const background = new FFVIMenuBackground({
                scene, 
                x, y, 
                width, height,
                noArrows: true
            });

        super({
            scene, 
            background
        });
    }

    computeTextGraphic() {
        return new FFVIText({scene: this.scene, text: "", width: 700, height: 100, x: 350, y: 50});
    }
}
