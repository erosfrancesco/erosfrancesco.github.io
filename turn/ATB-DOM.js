/**/SetATBof = (player, t) => {

	t = t || 0;

	player.ATBobj = {};

	if( !player.Enemy ){
		console.log(player.Name);
		player.ATBobj = LoadATBDOM(_Init_Menu.Ref, t, player.Name);	
		UpdateATBDOM(player, 0);
	}

	}

	UpdateATBLifeAndManaOf = (player) => {
		player.ATBobj.Stats.innerHTML = returnStatOf(player, 'lif') + '/' + returnStatOf(player, 'man');
	};

	UpdateATBDOM = (player, val) => {
		UpdateATBLifeAndManaOf(player);
		player.ATBobj.Slide.style.left = ( val - 100 ) + '%';
	}
	
	ATBToggleFull = (player) => { 
		player.ATBobj.Slide.style.background = _Menu_Options.ATBFull; 
	};

/**/


/**/LoadATBDOM = (parent, t, txt1) => {

	let _Standard_Border_Radius = '15px 15px 15px 15px',
	
	atb = Bridge.DOM.Div( 'calc( 35% - 5px )', 'calc(' + ( t * 25 ) + '% + 5px)', 
		                  '65%', '25%', 
		                  {
		                  	//position: 'absolute',
		                  	//border: 'solid 1px black'
						  }, parent),

	/* Text (name) */
	NameTxt = Bridge.DOM.Txt(txt1, { 
									left		: '0%',
									top			: '0%',
									width		: '35%',
									height  	: '0%',

									textAlign 	: 'center',
									margin		: 'auto',
									fontFamily	: 'FFVIFont',
									lineHeight	: '200%',
									fontSize	: '130%',

									textShadow 	: _Menu_Options.shadowText,
									color		: _Menu_Options.ActiveColor 
								}, atb),
	/* Text (life and mana) */
	StatsTxt = Bridge.DOM.Txt('100/3', { // here it doesn't matter, 'cause RefreshATBOf will take care of text
									left		: '34%',
									top			: '0%',
									width		: '25%',
									height  	: '0%',

									textAlign 	: 'center',
									margin		: 'auto',
									fontFamily	: 'FFVIFont',
									lineHeight	: '200%',
									fontSize	: '130%',

									textShadow 	: _Menu_Options.shadowText,
									color		: _Menu_Options.ActiveColor 
								}, atb),

	/* Border */
	Border = Bridge.DOM.Div('65%', 'calc( 20% + 2px )', 'calc( 35% - 5px )', 'calc( 35% - 5px )', {
		borderRadius: _Standard_Border_Radius,
		boxShadow: 'inset 0px 0px 0px 0px #252525, 0px 0px 0px 3px #D2D2D2, 0px 0px 0px 4px #252525;',
		overflow: 'hidden'
	}, atb),

	/* Slide */
	Slide = Bridge.DOM.Div('0%', '0%', '100%', '100%', { 
		borderRadius: _Standard_Border_Radius,
		background : _Menu_Options.ATBLoad
	}, Border);

	return {
		DOMPar: atb,
		Name: NameTxt,
		Stats: StatsTxt,
		Slide: Slide,
		Value: 0
	};

	}


/**/
	ATBToggleEmpty = (ATBobj) => { 
		ATBobj.Value = 0; 
		ATBobj.Slide.style.background = _Menu_Options.ATBLoad;
	}

	ATBUpdateDOM = (ATBobj) => { ATBobj.Slide.style.width = ( ATBobj.Value * 100 / _ATBMAX ) + '%'; }
	
	returnATBvalueOf = (player) => { return player.ATBobj.Value; }
/**/