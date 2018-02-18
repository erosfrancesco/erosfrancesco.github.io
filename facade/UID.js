_Create_UID_With_Bridge = () => {
    _Gm.UID = Bridge.DOM.Div('0%', '0%', '100%', '100%', {
        zIndex: 1000,
        border: 'solid black 1px',
        //overflow: 'hidden'
    }, _Gm.container);
};


_Create_PAUSE_With_Bridge = () => {

    // need to set the standard font
    _Gm.UIDPause = Bridge.DOM.Div('0%', '0%', '100%', '100%', {
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
        //opacity: 0.5,
        visibility: 'hidden'
    }, _Gm.UID);

    _Gm.UIDPauseText = Bridge.DOM.Txt('PAUSE', {

        top: '40%',
        left: '40%',
        width: '20%',
        color: '#D2D2D2',


        textAlign: 'center',
        fontFamily: 'FFVIFont'
    }, _Gm.UIDPause);

}



/**********************************************************************/

resetUID = () => {
    while (_Gm.UID.childNodes[0]) { 
        Bridge.DOM.Remove(_Gm.UID.childNodes[0]); 
    }
}




touchStartHandler = (e) => { 
    let txt = e.path[0].command;
    if ( (_Gm._inputObject.INPUT_MAP[txt]) && (!_Gm._inputObject.INPUT_EVENTS[txt]) ) {
        _Gm._inputObject.INPUT_EVENTS[txt] = true;
    } 
};

_buildTouchControlButton = (label, comm, x, y, leftAdjust, topAdjust) => {
                                    
    leftAdjust = leftAdjust || '0%';
    topAdjust  = topAdjust  || '0%';

    let wrap = Bridge.DOM.Div(x, y, '30px', '30px', {
            border: 'solid lightgrey 1px',
            borderRadius: '50%',
            backgroundColor: 'darkgrey',
            boxShadow: '0px 0px 2px 0px lightgrey'
        }, document.body),

        t   = Bridge.DOM.Txt(label, {
                color: 'white',
                marginTop:  'calc(3% + ' + topAdjust + ')',
                marginLeft: 'calc(20% + ' + leftAdjust + ')',
                fontSize: '150%'
            }, wrap);

    t.command = comm;
    t.addEventListener("touchstart", touchStartHandler, false);
    t.addEventListener("click", touchStartHandler, false);

    return wrap;
};



_buildDefaultTouchControlRight = () => {
    _buildTouchControlButton('X', 'x', '30%', '0%', '1px', '1px');
    _buildTouchControlButton('Z', 'z', '40%', '0%', '2px', '1px');
};

_buildDefaultTouchControlLeft = () => {
    _buildTouchControlButton('&#8593', 'up',   '60%', '0%', '3px', '0px');
    _buildTouchControlButton('&#8595', 'down', '80%', '0%', '3px', '0px');
    _buildTouchControlButton('&#8592', 'left',  '50%', '0%', '-1px', '0px');
    _buildTouchControlButton('&#8594', 'right', '70%', '0%', '-4px', '0px');
};


_Gm.machine.assign('PAUSE OVERRIDE FUNCTION', _pause_Input_Facade.loop);
_pause_Input_Facade.set(_input_Array_Pause, 8);

_Gm._inputObject = _buildInputFacade(new THREEx.KeyboardState());
_Gm.machine.assign('INPUT RESOLVER', () => { if (_Gm.inputIsEnabled) { _Gm._inputObject.loop(); } });

_Create_UID_With_Bridge();
_Create_PAUSE_With_Bridge();

_buildTouchPauseDiv();
_buildDefaultTouchControlRight();
_buildDefaultTouchControlLeft();
