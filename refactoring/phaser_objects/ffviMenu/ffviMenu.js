export default class FFVIMenuGraphic {
    constructor({
        scene,
        width = 100, height = 100,
        x = 100, y = 100,
        onComplete = () => { }
    }) {

        //
        const wrapper = document.createElement('div');
        wrapper.style.width = width + "px";
        wrapper.style.height = height + "px";
        wrapper.style.borderRadius = "8px";
        wrapper.style.backgroundColor = "rgba(73,73,203,1)";
        wrapper.style.opacity = 1;

        //
        const gradient = document.createElement('div');
        wrapper.appendChild(gradient);

        gradient.style.borderRadius = "8px";
        gradient.style.background = "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.85) 100%)";
        gradient.style.height = "100%";
        gradient.style.width = "100%";
        gradient.style.zIndex = 1;

        //
        const border = document.createElement('div');
        wrapper.appendChild(border);

        border.style.width = "calc(100% - 12px)";
        border.style.height = "calc(100% - 12px)";
        border.style.position = "absolute";
        border.style.top = "7px";
        border.style.left = "7px";
        border.style.boxShadow = "inset 0px 0px 2px 2px #252525, 0px 0px 1px 5px #D2D2D2, 0px 0px 0px 7px #252525";
        border.style.borderRadius = "4px";
        border.style.zIndex = 2;

        //
        this.sprite = scene.add.dom(x, y, wrapper);
        this.sprite.scaleY = 0;
        this.sprite.scaleX = 0;

        scene.tweens.add({
            targets: this.sprite,
            ease: 'Expo.easeInOut',
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            onComplete
        });
    }

    destroy(onComplete = () => { }) {
        this.sprite.scene.tweens.add({
            targets: this.sprite,
            ease: 'Expo.easeInOut',
            scaleX: 0,
            scaleY: 0,
            duration: 500,
            onComplete: () => {
                this.sprite.destroy();
                onComplete();
            }
        });
        
    }
}
/*

var eases = [
        'Linear',
        'Quad.easeIn',
        'Cubic.easeIn',
        'Quart.easeIn',
        'Quint.easeIn',
        'Sine.easeIn',
        'Expo.easeIn',
        'Circ.easeIn',
        'Back.easeIn',
        'Bounce.easeIn',
        'Quad.easeOut',
        'Cubic.easeOut',
        'Quart.easeOut',
        'Quint.easeOut',
        'Sine.easeOut',
        'Expo.easeOut',
        'Circ.easeOut',
        'Back.easeOut',
        'Bounce.easeOut',
        'Quad.easeInOut',
        'Cubic.easeInOut',
        'Quart.easeInOut',
        'Quint.easeInOut',
        'Sine.easeInOut',
        'Expo.easeInOut',
        'Circ.easeInOut',
        'Back.easeInOut',
        'Bounce.easeInOut'
    ];
    /**/