_buildInputFacade = (manager) => {
	let _dummy = {
		ALREADY_EXECUTED: [],
		INPUT_EVENTS: [],
		INPUT_MANAGER: manager,
		INPUT_MAP: [],

		set: (arr, SENS) => {

			_GAME_SET_INPUT(_dummy, arr, SENS);

			arr.forEach((f, input) => {
				_dummy.INPUT_EVENTS[input] = false;
				_dummy.ALREADY_EXECUTED[input] = SENS;
			});	
		}
	};

	_dummy.loop = () => {
		_dummy.events(() => {
			Object.keys(_dummy.INPUT_EVENTS).forEach((input) => { 
				if (_dummy.INPUT_EVENTS[input]) { _CORE_INPUT_LOOP(_dummy, input); }
			});
		});	
	};

	_dummy.events = (callback) => {
		Object.keys(_dummy.INPUT_MAP).forEach((i) => {
			if ( _dummy.INPUT_MANAGER.pressed(i) && (!_dummy.INPUT_EVENTS[i]) ) { _dummy.INPUT_EVENTS[i] = true; }
		});
		callback();
	};

	return _dummy;
};


_CORE_INPUT_LOOP = (_inputFacade, input) => {

	if ( _inputFacade.ALREADY_EXECUTED[input] ){
		_inputFacade.ALREADY_EXECUTED[input]--;
	}else{
		_inputFacade.INPUT_EVENTS[input] = false;
		_inputFacade.ALREADY_EXECUTED[input] = _inputFacade.KEYBOARD_SENSIBILITY;
		_inputFacade.INPUT_MAP[input]();
	}
};


// use this to set an input array with sensibility
_GAME_SET_INPUT = (_inputFacade, arr, SENS) => { 
	_inputFacade.KEYBOARD_SENSIBILITY = SENS || 4;
	_inputFacade.INPUT_MAP = arr; 
	_Gm._inputObject = _inputFacade;
};

let _input_Array_Pause  = [],
    _pause_Input_Facade = _buildInputFacade(new THREEx.KeyboardState());

_input_Array_Pause['p'] = () => {
	_Gm.UIDPause.Visible( !_Gm.machine.Paused );
	//_Gm.UIDPause.style.visibility = ( _Gm.machine.Paused ) ? 'hidden' : 'visible'
	_Gm.machine.Paused ? ResumeMachine(_Gm.machine) : PauseMachine(_Gm.machine)
}

_buildTouchPauseDiv = () => {
	_pauseHandler = () => { _pause_Input_Facade.INPUT_EVENTS['p'] = true; };
	let wrap = Bridge.DOM.Div('25%', '0%', '50%', '100%', { zIndex: 1001 }, _Gm.renderer.domElement.parent);
	wrap.addEventListener("touchstart", _pauseHandler, false);
	wrap.addEventListener("click", _pauseHandler, false);
									
	return wrap;
};
