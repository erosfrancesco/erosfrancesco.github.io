let WebGLDefault = {

	scene: (SCREEN_WIDTH, SCREEN_HEIGHT) => { return new THREE.Scene(); },

	camera: (scene) => {

		// autofill. If no scene is provided, it will be created.
		
		scene = scene || new THREE.Scene();

		// camera attributes
		let SCREEN_WIDTH 	=	defaultValues.width,
			SCREEN_HEIGHT 	=	defaultValues.height,
			ASPECT			=	SCREEN_WIDTH / SCREEN_HEIGHT,

			VIEW_ANGLE		=	defaultValues.angle,
			POSITION_X		=	defaultValues.x
			POSITION_Y		= 	defaultValues.y
			POSITION_Z		= 	defaultValues.z

			NEAR			= 	defaultValues.near,
			FAR				= 	defaultValues.far,
			
		    camera          = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR); // set up camera

		// add the camera to the scene
		scene.add(camera);
		camera.position.set(POSITION_X, POSITION_Y, POSITION_Z);
		camera.lookAt(scene.position);

		// Return the scene
		return scene;
	},

	renderer: () => {

		let height = defaultValues.height,
			width  = defaultValues.width,
			left   = defaultValues.left,
			top    = defaultValues.top,
			renderer,
			container = Bridge.DOM.Div(left, top, width, height, {}, document.body);

		// create and start the renderer;
		if (Detector.webgl) {
			renderer = new THREE.WebGLRenderer( defaultValues.WebGLOptions );
		}else{
			renderer =  new THREE.CanvasRenderer();
		}
		renderer.setSize(width, height);

		// set up a container wrapper and attach renderer to the container div
		container.appendChild( renderer.domElement );
		container.renderer = renderer;
		
		return container;
	},

	statistic: function(container){
	
		container = container || document.body;

		// displays current and past frames per second attained by scene
		var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		container.appendChild( stats.domElement );

		return stats;
	}
}


/* ******************************************************************************************** */


const defaultValues = {

	width: 800,
	height: 600,

	left: 'calc( 50% - 400px )',
	top: 'calc( 50% - 300px )', // cool

	near: 0.1,
	far: 20000,
	angle: 45,
	x: 0,
	y: 0,
	z: 400,
	WebGLOptions: {antialias: false}
};


/* ********************************************************************************************** */
