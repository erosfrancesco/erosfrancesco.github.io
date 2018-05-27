var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);


function preload()
{
    this.load.image('character', ['../assets/kefka-tolit.png', '../assets/kefka-tolit_n.png']);
    this.load.image('sky', '../assets/GoldenSky.png');
}


function create()
{

    var capguy2 = this.add.sprite(400, 300, 'sky');


    // add single sprite
    let capguy = this.add.sprite(250, 250, 'character');
    capguy.setPipeline('Light2D');

    // switch on light
    //this.lights.addLight(350, 50, 1600);
    var light = this.lights.addLight(350, 210, 1600); // 346 213
    this.lights.enable();
    this.lights.setAmbientColor(0xfffec9);

    /*
    // use mouse pointer to move light position
    this.input.on('pointermove', function (pointer) {
        light.x = pointer.x;
        light.y = pointer.y;
        console.log(pointer.x, pointer.y);
    });
    /**/
}

function update() {
    //this.capguy.update();
}