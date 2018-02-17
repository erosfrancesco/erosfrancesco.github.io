_DrawSpriteSheet = (sprite, x, y, z, width, height, initialSheetName, initialFrameName) => {

	let clonedSprite = deepClone(sprite),
	    sheetReferName = initialSheetName || Object.keys( clonedSprite.sprites )[0],
	    frameReferName;

	width 	= width || clonedSprite.currentSheet.width;
	height 	= height || clonedSprite.currentSheet.height;

	clonedSprite.currentSheet = clonedSprite.sprites[sheetReferName];
	frameReferName            = initialFrameName || Object.keys( clonedSprite.currentSheet.pool )[0];
	clonedSprite.currentFrame = clonedSprite.currentSheet.pool[frameReferName];

	clonedSprite.currentNameReference = {
		'frame': frameReferName,
		'sheet': sheetReferName
	};

	SetSpriteGraphicOffsets( SetSpriteGraphicRefence(clonedSprite, width, height), 
		clonedSprite.currentSheet, 
		clonedSprite.currentFrame, 
		clonedSprite.width, clonedSprite.height);

	SpritePosition(clonedSprite.Ref, x, y, z);

	clonedSprite.Ref.width = width;
	clonedSprite.Ref.height = height;

	_Gm.scene.add( clonedSprite.Ref );

	return clonedSprite;
}

SetSpriteGraphicRefence = (sprite, width, height) => {

	let spriteTexture  = new THREE.ImageUtils.loadTexture( sprite.src ),
		spriteGeometry = new THREE.PlaneGeometry( -width, -height ),
		spriteMaterial = new THREE.MeshBasicMaterial({
			map: spriteTexture,
			side:THREE.DoubleSide,
			transparent: true,
			useScreenCoordinates: true,
		});

	sprite.Ref = new THREE.Mesh(spriteGeometry, spriteMaterial);
	spriteTexture.wrapS = spriteTexture.wrapT = THREE.RepeatWrapping;

	return spriteTexture;
}


SetSpriteGraphicOffsets = (spriteTexture, sheet, frame, width, height) => {
	
	spriteTexture.repeat.set(sheet.width / width, 
							 sheet.height / height);

	spriteTexture.offset.y = ( 1 - ( sheet.height / height ) ) - ( frame.offy / height );
	spriteTexture.offset.x = ( frame.offx / width );
}