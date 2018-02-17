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

_Create_UID_With_Bridge();
_Create_PAUSE_With_Bridge();

/**********************************************************************/

resetUID = () => {
    while (_Gm.UID.childNodes[0]) { 
        Bridge.DOM.Remove(_Gm.UID.childNodes[0]); 
    }
}
