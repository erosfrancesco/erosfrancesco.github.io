export default class MenuBackground {
    constructor(options) {

    	const {
    		width, height,
    		x, y,
    		scene,
            styling
    	} = options;
		
        this.x = x;
        this.y = y;
        this.width  = width;
        this.height = height;
        this.scene = scene;

        this.sprite = styling(this);
    }


    destroy() {
        this.sprite.destroy();
    }
}
