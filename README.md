# erosfrancesco.github.io
```javascript
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#efefef',
    scene: {
        create: create,
        preload: preload
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image("Guzma", "https://raw.githubusercontent.com/erosfrancesco/erosfrancesco.github.io/master/assets/sprites/Guzma.png");
}

function create ()
{
    this.add.circle(300, 250, 128, 0xff00ff).setBlendMode(Phaser.BlendModes.MULTIPLY);
    this.add.circle(500, 250, 128, 0x00ffff).setBlendMode(Phaser.BlendModes.MULTIPLY);
    this.add.circle(400, 400, 128, 0xffff00).setBlendMode(Phaser.BlendModes.MULTIPLY);


    this.add.image(400, 300, "Guzma").setTintFill("0xffffff4", "0xff3434").setBlendMode(Phaser.BlendModes.MULTIPLY);
}
```
