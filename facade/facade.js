const _Gm = {

	KEYBOARD_SENSIBILITY: 4,// these two must be set by a method // pause sensibility must be tweaked a bit...
	keyMapper: [],			//
	dummyKeyboardSensibilityCounter: 0,
	inputIsEnabled: true,
	
	scene: WebGLDefault.camera(),
	container: WebGLDefault.renderer(),

	keyboard: new THREEx.KeyboardState(),
	machine: CiclicStateMachine()
};

_Gm.camera   = _Gm.scene.children[0];
_Gm.renderer = _Gm.container.renderer;

// use this to set an input array with sensibility
_Gm.setInput = (arr, SENS) => { _Gm.KEYBOARD_SENSIBILITY = SENS || 4; _Gm.keyMapper = arr; }

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
_Gm.machine.assign('RENDERER LOOP', () => { _Gm.renderer.render( _Gm.scene, _Gm.camera); });

_Gm.machine.assign('KEYBOARD INPUTS', () => {
	if (_Gm.inputIsEnabled) {
		Object.keys(_Gm.keyMapper).forEach(key => ( _Gm.keyboard.pressed(key) && _Gm.SENS_Bool) ? _Gm.keyMapper[key]() : false);
	}else{
		console.log('Input is not enabled');
	}
});

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
animate = () => { 
	requestAnimationFrame(animate); 
	_Gm.machine.run(); 
};
animate();
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* Pause setup */
PauseLoopCheck = () => {
	_Gm.UIDPause.style.visibility = ( _Gm.UIDPause.style.visibility == 'hidden' ) ? 'visible' : 'hidden'
	_Gm.machine.Paused ? ResumeMachine(_Gm.machine) : PauseMachine(_Gm.machine)
}

_Gm.machine.assign('PAUSE OVERRIDE FUNCTION', () => {
	
	_Gm.dummyKeyboardSensibilityCounter++;
	_Gm.dummyKeyboardSensibilityCounter %= _Gm.KEYBOARD_SENSIBILITY;
	_Gm.SENS_Bool = !( Boolean(_Gm.dummyKeyboardSensibilityCounter) );
	

	(_Gm.keyboard.pressed('p') && _Gm.SENS_Bool) ? PauseLoopCheck() : false
});

resetThreejsScene = () => {
    //_Gm.scene.children[0] is the camera. It doesn't need to be removed
    while (_Gm.scene.children[1]) { _Gm.scene.remove(_Gm.scene.children[1]); }
}