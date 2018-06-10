class Button {
    constructor(options) {
        
        let {scene,
            x, y,
            width, height
        } = options;

        this.area = scene.add.container(0, 0);
        this.area.setSize(width, height);
        this.area.moveTo(x, y);
        
        //this.area.x = x;
        //this.area.y = y;
        this.area.setInteractive();

        //this.area.on('pointerover', (event) => { console.log('over', event); /* Do something when the mouse enters */ });
        //this.area.on('pointerout', (event) => { console.log('over');/* Do something when the mouse exits. */ });
        //this.area.on('pointerdown', (event) => { console.log('over'); /* Do something when the mouse click. */ });
    }

    //addChild(obj) { this.area.addChild(obj); }
    emit(name, params) { this.area.emit(name, params); }
    on(name, callback) { this.area.on(name, callback); }

}
