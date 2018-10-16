# Work in progress

## Asset loader
Used in ATBBattleScene class. <br>
Possible asset types (See Phaser loader):
- image
- spritesheet
- audio

``` var assets = {

  baseUrl: '../assets/',
  image: [{
    key: 'guzma',
    src: './sprites/Guzma.png'
  }, {
    key: 'background',
    src: './backgrounds/hip_hop_streets.png'
  }],
  spritesheet: [{
     key: 'FFVICast', 
     params: { frameWidth: 680 / 4, frameHeight: 756 / 4 }, 
     src: 'ffviCast.png'
  }]

} ```
