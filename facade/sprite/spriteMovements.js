/*	

SpriteSheet({
	img 	: KefkaSprite,
	
	x 		: 0,
	y 		: 0,
	z 		: 0,

	width 	: (118 / 3),
	height 	: (146 / 2),

	total 		: 6, // this must be synched well: total = columns * lines
	columns 	: 3,
	lines		: 2,
	
	frequence 	: 1,
});

// set from top - left corner. 
runner.position.set( 	( options.x - ( options.height / 2 ) ),
						( options.y - ( options.height / 4 ) ), 
						( options.z - ( options.height / 4 ) ) );



// these sweetcakes don't give problems of resizing.
w: function(){ player.SpriteSource.Ref.translateY( -velocity ); }, 	// up
s: function(){ player.SpriteSource.Ref.translateY( velocity ); },	// down
a: function(){ player.SpriteSource.Ref.translateX( velocity ); },	// left
d: function(){ player.SpriteSource.Ref.translateX( -velocity ); },	// right
				
// z axis translations gives some problem with resizing, involves ratio, probably 
g: function(){ player.SpriteSource.Ref.translateZ( -velocity ); },	// front
h: function(){ player.SpriteSource.Ref.translateZ( velocity ); }	// back
/**/


SpritePosition = (sprite, x, y, z) => {
	sprite.scale.set( -0.5, -0.5, 1.0); // why??
	sprite.position.set( x, y, z );
}


SpriteMoveUp    = (sprite, vel) => { sprite.translateY( -vel ); }
SpriteMoveDown  = (sprite, vel) => { sprite.translateY( vel ); }
SpriteMoveLeft  = (sprite, vel) => { sprite.translateX( vel ); }
SpriteMoveRight = (sprite, vel) => { sprite.translateX( -vel ); }
// careful with those two...
SpriteMoveFront = (sprite, vel) => { sprite.translateZ( -vel ); }
SpriteMoveBack  = (sprite, vel) => { sprite.translateZ( vel ); }


