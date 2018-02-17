ReturnCurrentMenuWrapper = () => { return _Gm.UID; }

setStandardMenuDOM = (menuGen) => {

	let wrapper = Bridge.DOM.Div( 'calc(' + menuGen.x + ' + 6px)', 
		'calc(' + menuGen.y + ' + 6px)',
		'calc(' + menuGen.width + ' - 12px)', 
		'calc(' + menuGen.height + ' - 12px)', 
		{
			borderRadius: _Menu_Options.borderRadius,
			boxShadow: _Menu_Options.boxShadow,
			overflow: 'hidden'
		}, ReturnCurrentMenuWrapper()),

	    background = Bridge.DOM.Div('0%', '0%', '100%', '100%', {
			background: _Menu_Options.backgroundColor,
		}, wrapper);
	
	return wrapper;
};
