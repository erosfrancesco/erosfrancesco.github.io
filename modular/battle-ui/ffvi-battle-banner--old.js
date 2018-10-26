import FFVIMenuBackground from '../../menu_API/ffvi-menu-background.js';
import FFVIText from '../../menu_API/ffvi-text.js';


//
const computeArea = ({scene}) => {
    return { width: (700 - 100), height: 100 }
}

//
const computePosition = ({scene}) => {
    return { x: (100 - 100 / 2), y: 10 };
}


export default class FFVIBattleBanner extends FFVIMenuBackground {
	constructor({scene}) {

        // get height and width from scene...
        const { width, height } = computeArea({scene});
        
        let { x, y } = computePosition({scene});
        x += width / 2;
        y += height / 2;
    
    console.log(scene)

        super({
            scene, 
            x, y, 
            width, height,
            noArrows: true,
            verticalArrows: false, horizontalArrows: false
        });

        // x is scene width / 2
        this.textWrapper = new FFVIText({scene, text: '', x: 375, y: height / 2, width, height});
        this.textWrapper.sprite.setFontSize(height / 2);

        //this.visible = false;


        //this.text = 'hello world';
    }

    set text(v) {
        this.textWrapper.text = v;
        if (!this.visible) {
            this.visible = true;
        }
    }

    get text() {
        return this.textWrapper.text;
    }


    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this.sprite.setVisible(v);
        this.textWrapper.visible = v;
    }
}
