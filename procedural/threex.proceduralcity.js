// from @mrdoob http://www.mrdoob.com/lab/javascript/webgl/city/01/
// modded for better code management

ProceduralCity	= (renderer, lightColor, shadowColor) => {

	let geometry, buildingMesh, cityGeometry, texture, material, mesh;

	// build Geometry
	geometry = buildBaseGeometry();

	// buildMesh
	buildingMesh = new THREE.Mesh( geometry );
	cityGeometry = new THREE.Geometry();
	
	// iterator
	let counter = 0, 
	    options = {
	    	// base colors for vertexColors. light is for vertices at the top, shaddow is for the ones at the bottom
	    	colors: {
	    		light:  lightColor  || new THREE.Color( 0xffffff ),
	    		shadow: shadowColor || new THREE.Color( 0x303050 )
	    	}
		};
	while (counter < 10000) { cityIteratorCicle(counter, buildingMesh, cityGeometry, options); counter++; }

	// generate the texture
	texture		        = new THREE.Texture( generateTextureCanvas('#44ff44') );
	texture.anisotropy	= renderer.getMaxAnisotropy();
	texture.needsUpdate	= true;

	// build the mesh
	material	= new THREE.MeshLambertMaterial({
		map:          texture,
		vertexColors: THREE.VertexColors
	});
	mesh = new THREE.Mesh(cityGeometry, material );
	return mesh;
};

/***************************************************************
 *  Geometry Stuff
 ***************************************************************/
buildBaseGeometry = () => {

	// build the base geometry for each building
	let geometry = new THREE.CubeGeometry( 1, 1, 1 ), bottomIndex = 3;
	
	// translate the geometry to place the pivot point at the bottom instead of the center
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
	
	// get rid of the bottom face - it is never seen
	geometry.faces.splice( bottomIndex, 1 );
	geometry.faceVertexUvs[0].splice( bottomIndex, 1 );
	
	// change UVs for the top face
	// - it is the roof so it wont use the same texture as the side of the building
	// - set the UVs to the single coordinate 0,0. so the roof will be the same color
	//   as a floor row.
	geometry.faceVertexUvs[0][2][0].set( 0, 0 );
	geometry.faceVertexUvs[0][2][1].set( 0, 0 );
	geometry.faceVertexUvs[0][2][2].set( 0, 0 );
	
	return geometry;
};


/***************************************************************
 *  Iterator Stuff
 ***************************************************************/
cityIteratorCicle = (i, iteratorMesh, cityGeometry, options /*light, shadow/**/) => {

	positionAtRandom(iteratorMesh);
	colorAtRandom(iteratorMesh, options.colors.light, options.colors.shadow);
	// merge it with cityGeometry - very important for performance
	THREE.GeometryUtils.merge( cityGeometry, iteratorMesh );
};

positionAtRandom = (mesh) => {

	let seed1 = Math.random(),
	    seed2 = Math.random(),
	    seed3 = Math.random();

	// put a random position
	mesh.position.x	= Math.floor( seed1 * 200 - 100 ) * 10;
	mesh.position.z	= Math.floor( seed3 * 200 - 100 ) * 10;
	// put a random rotation
	mesh.rotation.y	= seed2 * Math.PI * 2;
	// put a random scale
	mesh.scale.x	= seed2 * seed1 * seed3 * seed3 * 50 + 10;
	mesh.scale.y	= (seed1 * seed2 * seed2 * mesh.scale.x) * 8 + 8;
	mesh.scale.z	= mesh.scale.x;
};

colorAtRandom = (mesh, light, shadow, n) => {

	// this should parametrize the color contrast
	n = n || 2;

	// establish the base color for the buildingMesh
	let seed1 = Math.random() * Math.random(),
	    seed2 = Math.random(),
	    seed3 = Math.random(),
	    r = seed1,
	    g = ( ( seed1 * n ) + seed2 ) / (2 * n),
	    b = ( ( seed1 * n ) + seed3 ) / 2,
	    baseColor = new THREE.Color().setRGB( r, g, b );

	// set topColor/bottom vertexColors as adjustement of baseColor
	let topColor	= baseColor.clone().multiply( light ),
	    bottomColor	= baseColor.clone().multiply( shadow );
		
	// set .vertexColors for each face
	mesh.geometry.faces.forEach((face, indx) => {
		if ( indx === 2 ) {
			// set face.vertexColors on root face
			face.vertexColors = [ baseColor, baseColor, baseColor, baseColor ];
		} else {
			// set face.vertexColors on sides faces
			face.vertexColors = [ topColor, bottomColor, bottomColor, topColor ];
		}
	});
};


/***************************************************************
 *  Texture Stuff
 ***************************************************************/

generateTextureCanvas = (baseColor) => {

	// build a small canvas 32x64 and paint it in white
	let canvas	= document.createElement( 'canvas' ), 
		context = canvas.getContext( '2d' );

	canvas.width  = 32;
	canvas.height = 64;

	// plain it in white
	context.fillStyle	= baseColor || '#ffffff';
	context.fillRect( 0, 0, 32, 64 );

	// draw the window rows - with a small noise to simulate light variations in each room
	for( var y = 2; y < 64; y += 2 ){

		for( var x = 0; x < 32; x += 2 ){
			
			context.fillStyle = generateRandomRGBColor();
			context.fillRect( x, y, 2, 1 );
		}
	}

	console.log('texture of city done');
	return generateUpscaledCanvas(canvas);
};

generateRandomRGBColor = () => {
	let value	= Math.floor( Math.random() * 64 );
	return 'rgb(' + [value, value, value].join( ',' )  + ')';
};

// build a big canvas and copy a small one in it
// This is a trick to upscale the texture without filtering
generateUpscaledCanvas = (canvas) => {

	let canvas2	= document.createElement( 'canvas' ), 
	    cxt	    = canvas2.getContext( '2d' );

	canvas2.width	= 512;
	canvas2.height	= 1024;

	// disable smoothing
	cxt.imageSmoothingEnabled		= false;
	cxt.webkitImageSmoothingEnabled	= false;
	cxt.mozImageSmoothingEnabled	= false;
	
	// then draw the image
	cxt.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
	
	// return the just built canvas2
	return canvas2;
};
