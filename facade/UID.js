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

_buildTouchControlButton = (label, comm, x, y, leftAdjust, topAdjust, parent) => {
                                    
    leftAdjust = leftAdjust || '0%';
    topAdjust  = topAdjust  || '0%';

    let wrap = Bridge.DOM.Div(x, y, '60%', '10%', {
            border: 'solid lightgrey 1px',
            borderRadius: '50%',
            backgroundColor: 'darkgrey',
            boxShadow: '0px 0px 2px 0px lightgrey',
            textShadow: '0px 2px 2px rgba(0, 0, 0, 1)',
            position: 'relative'
        }, parent || document.body),

        t   = Bridge.DOM.Txt(label, {
                color: 'white',
                marginTop:  topAdjust,//'calc(3% + ' + topAdjust + ')',
                marginLeft: leftAdjust,//'calc(20% + ' + leftAdjust + ')',
                fontSize: '6vh',
                
                width: '100%',
                height: '100%',
                
                top: '25%',
                left: '25%'
            }, wrap);

    t.command = comm;
    t.addEventListener("touchstart", touchStartHandler, false);
    t.addEventListener("click", touchStartHandler, false);

    return wrap;
};



_buildDefaultTouchControlRight = () => {
    
    let rightWrapper = Bridge.DOM.Div('calc(50% + 400px)', '30px', '100px', '600px', {}, document.body);

    _buildTouchControlButton('X', 'x', '30%', '50%', '0%', '-15%', rightWrapper);
    _buildTouchControlButton('Z', 'z', '30%', '35%', '2%', '-15%', rightWrapper);
};

_buildDefaultTouchControlLeft = () => {

    let leftWrapper = Bridge.DOM.Div('calc(50% - 400px - 100px)', '30px', '100px', '600px', {}, document.body);

    _buildTouchControlButton('&#8593', 'up',    '30%', '20%', '7%', '-18%', leftWrapper);
    _buildTouchControlButton('&#8594', 'right', '30%', '35%', '-10%', '-15%', leftWrapper);
    _buildTouchControlButton('&#8592', 'left',  '30%', '50%', '-10%', '-15%', leftWrapper);
    _buildTouchControlButton('&#8595', 'down',  '30%', '65%', '7%', '-18%', leftWrapper);
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
