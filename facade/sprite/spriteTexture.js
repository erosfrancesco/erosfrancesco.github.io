function SpriteSheet(options){

	options           = options           || {};
	//options.img       = options.img,
	options.x         = options.x 		  || 0;
	options.y         = options.y 		  || 0;
	options.z         = options.z 		  || 0;
	options.width     = options.width  	  || 100;
	options.height    = options.height 	  || 100;
	options.total     = options.total     || 1;
	options.columns   = options.columns   || 1;
	options.lines     = options.lines     || 1;
	options.frequence = options.frequence || 1;

	let AnimTexture    = new THREE.ImageUtils.loadTexture( options.img );
	// BETTER RESIZING
	AnimTexture.magFilter = THREE.NearestFilter;
	AnimTexture.minFilter = THREE.LinearMipMapLinearFilter;

	let spriteMaterial = new THREE.MeshBasicMaterial({ 
			map: AnimTexture, 
			side:THREE.DoubleSide,
			transparent: true, // transparent
			useScreenCoordinates: true,
		}),
		spriteGeometry = new THREE.PlaneGeometry( -(options.width), -(options.height )),
		sprite         = new THREE.Mesh(spriteGeometry, spriteMaterial);

	
	SpritePosition(sprite, options.x, options.y, options.z);

	sprite.SpriteSheet = TextureAnimator( AnimTexture, 
		options.total, 
		options.columns, 
		options.lines,
		options.frequence);

	sprite.Texture = AnimTexture;

	_Gm.scene.add(sprite);
	return sprite;
}



function TextureAnimator(texture, numTiles, tilesHoriz, tilesVert, refreshFrequence, updateFunction){

	let SPRITE = {
		
		// how many images does this spritesheet contain?
		//  usually equals tilesHoriz * tilesVert, but not necessarily,
		//  if there at blank tiles at the bottom of the spritesheet. 
		tilesHorizontal			: tilesHoriz 		|| 1,
		tilesVertical			: tilesVert  		|| 1,
		numberOfTiles			: numTiles   		|| 1,
		// current tile
		currentTile 			: 0,
		// update every tot cicle...
		refreshFrequence 		: refreshFrequence || 1,
		updateCurrentTile       : updateFunction   || function(x) { return x; },
		dummyCounter 			: 0,	
	};
	// THREEJS SETUP
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / SPRITE.tilesHorizontal, 1 / SPRITE.tilesVertical );

	// this goes in a loop...
	SPRITE.Update = (f) => {
		SPRITE.dummyCounter++;
		SPRITE.dummyCounter %= SPRITE.refreshFrequence;
		if( !SPRITE.dummyCounter ){ SPRITE.updateWithNoFrequence(f); }
	}
	
	// this function must be called based on frequence
	SPRITE.updateWithNoFrequence = function(){

		// update currentTile
		SPRITE.currentTile = SPRITE.updateCurrentTile( SPRITE.currentTile, 
												SPRITE.tilesHorizontal, 
												SPRITE.tilesVertical, 
												SPRITE.numberOfTiles );

		// calc new frame
		SPRITE.currentTile %= SPRITE.numberOfTiles;
		SPRITE.currentColumn = ( SPRITE.currentTile % SPRITE.tilesHorizontal );
		SPRITE.currentRow    = ( Math.floor( SPRITE.currentTile / SPRITE.tilesHorizontal ) );
		
		// apply new frame
		texture.offset.y = 1 - (1 / SPRITE.tilesVertical ) - (SPRITE.currentRow / SPRITE.tilesVertical); 
		texture.offset.x = (SPRITE.currentColumn / SPRITE.tilesHorizontal);
		// I'll trust these formulae...
	}

	return SPRITE;
}
