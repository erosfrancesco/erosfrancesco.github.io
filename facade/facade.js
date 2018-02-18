let _Gm = {

	inputIsEnabled: true,
	scene: WebGLDefault.camera(),
	container: WebGLDefault.renderer(),

	machine: CiclicStateMachine()
};

_Gm.camera   = _Gm.scene.children[0];
_Gm.renderer = _Gm.container.renderer;

// use this to set an input array with sensibility
_Gm.setInput = (arr, SENS) => { 
	_Gm._inputObject.set(arr, SENS);
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
_Gm.machine.assign('RENDERER LOOP', () => { _Gm.renderer.render( _Gm.scene, _Gm.camera); });


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
animate = () => { 
	requestAnimationFrame(animate); 
	_Gm.machine.run(); 
};
animate();
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

resetThreejsScene = () => {
    //_Gm.scene.children[0] is the camera. It doesn't need to be removed
    while (_Gm.scene.children[1]) { _Gm.scene.remove(_Gm.scene.children[1]); }
}