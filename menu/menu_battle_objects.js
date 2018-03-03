StandardCommandPlacer = (top, left, width, height, scrollerW, obj, indxX, indxY) => {

	let object = Bridge.DOM.Txt( obj.txt, { left		: left + '%',
											top			: top + '%',
											width		: width + '%',
											height  	: height + '%',

											textAlign 	: 'center',
											margin		: 'auto',
											fontFamily	: 'FFVIFont',
											lineHeight	: '200%',
											fontSize	: '130%',

											textShadow 	: _Menu_Options.shadowText,
											color		: (obj.sel) ? _Menu_Options.ActiveColor : _Menu_Options.InactiveColor
											}, scrollerW);

	object.cmd = obj.cmd;
	return object;
};

/* New menu generators */

	let _Init_Menu = {
	    
		Name: 'Init',
		Objects: [[]],
		Scrolling: [1, 1],
	    
		Input:  [],
		Placer: StandardCommandPlacer,
	    
		width: '100%', height: '34%',
		x: '0%', y: '66%',
	};

	let _Battle_Menu = {

		Name: 'Battle',
		Scrolling: [4, 1],

		Input: _Menu_Movement_Array_Input,
		Placer: StandardCommandPlacer,
		cursorGen: setStandardCursorDOM,
		scrollerGen: setStandardScrollingDOM,

        width: '22%', height: '34%',
		x: '18%', y: '65%',
	};
	
	let _Item_Menu={

		Name: 	'Item',
        Objects: [[]],
		Scrolling: [4, 2],

		Input: _Menu_Movement_Array_Input,
		Placer: StandardCommandPlacer,
		cursorGen: setStandardCursorDOM,
		scrollerGen: setStandardScrollingDOM,

		width: '50%', height: '34%',
		x: '25%', y: '65%',
	};


/* Old Menu objects *//*

	var _Magic_Menu={
		Name:'Magic',
		Objects:[C_FIGHT],
		Input:_InputHandlr_Double,
		Placer:function(indx){SetElementOfMagicMenu(this,indx);},
		ScrollingMax:4,
		width:'65%',
		height:'34%',
		DOM:{x:'25%',y:'65%',Ref:'',Objects:[]},
	};
/**/
