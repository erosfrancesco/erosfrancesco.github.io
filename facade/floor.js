function InitTextureFloor(imageSrc){

	var floorTexture;

	var imageElement = document.createElement('img');
	imageElement.onload = function(e) {

	    floorTexture = new THREE.Texture( this );
	    floorTexture.needsUpdate = true;
	    // need to check this
	    //floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
		//floorTexture.repeat.set( 2, 2 );

		// DoubleSide: render texture on both sides of mesh
		var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
		var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
		var floor = new THREE.Mesh(floorGeometry, floorMaterial);

		floor.position.y = -0.5;
		floor.rotation.x = Math.PI / 2;

		_Gm.scene.add(floor);
	};

	/*FUCKING CORS POLICY*/
	imageElement.src = imageSrc;
}


function StandardColorFloor(color){

	// DoubleSide: render texture on both sides of mesh
	var floorMaterial = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);

	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;

	_Gm.scene.add(floor);
}

function StandardColorSky(color){
	// make sure the camera's "far" value is large enough so that it will render the skyBox!
	// BackSide: render faces from inside of the cube, instead of from outside (default).
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: color, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	_Gm.scene.add(skyBox);
}