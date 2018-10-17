// import modules (es6)
import ARROWBUTTONS from './arrow-button.js';
const {UpArrowButton, DownArrowButton, LeftArrowButton, RightArrowButton} = ARROWBUTTONS;
import MenuBackground from '../logic/stylizable-background.js';


export default class StylizedMenuBackground extends MenuBackground {
    constructor(options) {

        const {
            width, height, x, y, 
            scene, 
            noArrows, verticalArrows, horizontalArrows,
            styling
        } = options;

        super({
            width, height, 
            x, y, 
            scene, 
            noArrows, verticalArrows, horizontalArrows, 
            styling
        });

        this.noArrows = noArrows;
        this.verticalArrows = verticalArrows;
        this.horizontalArrows = horizontalArrows;

        this.wrapper = scene.add.container(x, y);
        this.wrapper.setSize(width, height / 2);
        this.wrapper.setInteractive();


        if (this.noArrows) return;

        if (this.verticalArrows) {
            this.upArrow    = new UpArrowButton   ({scene, x, y: y - 40 - height / 2 });
            this.downArrow  = new DownArrowButton ({scene, x, y: y - 5 + height / 2 });
        }

        if (this.horizontalArrows) {
            this.leftArrow  = new LeftArrowButton ({scene, x: x - 20 - width / 2, y: y - 20 });
            this.rightArrow = new RightArrowButton({scene, x: x + 20 + width / 2, y: y - 20 });
        }
    }

    destroy() {
        super.destroy();

        if (this.upArrow) this.upArrow.destroy();
        if (this.downArrow) this.downArrow.destroy();
        if (this.leftArrow) this.leftArrow.destroy();
        if (this.rightArrow) this.rightArrow.destroy();
    }

    setEvent(evnt, callback) {
        this.wrapper.on(evnt, callback);
    }
}
