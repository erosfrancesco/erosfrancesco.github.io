//
let MenuManager = {
   	
   	Animator: FIFOAnimation(),
   	Cursor:   Bridge.DOM.Img( Cursor_Sprite.src, {
   		visibility: 'hidden'
   		//position: 'absolute',
   		//left: '-100%', 
   	}),

   	push:     (menu) => { standardMenuGenerator(menu); },
   	remove:   () => { _RemoveMenu(); },

    stack:    []
};

// this need some tweaking
ReturnElement = () => { return ReturnTopMenu().Cursor.parentNode; };

ReturnTopMenu = () => { return MenuManager.stack[ MenuManager.stack.length - 1 ]; };

standardMenuGenerator = (menu) => {

	// 
	menu.DOM    = menu.DOM || {};
	menu.Ref    = setStandardMenuDOM( menu );	
	menu.Matrix = (menu.scrollerGen) ? menu.scrollerGen( menu ) : {}
	menu.Cursor = (menu.cursorGen) ? menu.cursorGen( menu ) : {}

    // at this point, cursor and matrix should be synched with DOM.
    MenuManager.stack.push( menu );

    // let's do some animations...
	menuStandardPopUpAnimation( menu );
    MenuManager.Animator.add(() => { 
    	if (menu.Matrix.update) { menu.Matrix.update(); }
    	if (menu.Cursor.update) { menu.Cursor.update(0, 0); }
    	if (menu.Cursor.style) { MenuManager.Cursor.style.visibility = 'visible'; }
    });
    MenuManager.Animator.add(() => { 
    	_Gm.setInput(ReturnTopMenu().Input, 4);
    	_Gm.inputIsEnabled = true; 
    });
};


_LoadMenuFromObject = (menu, cursorGen) => {

	menu.DOM    = menu.DOM || {};
	// Background and Border.
	menu.Ref    = SetWrapperMenuFromObject( menu );	
	// Set Scrolling DOM
	menu.Matrix = _setObjectWrapperForMenu(	menu.Ref, 
												menu.Scrolling, 
												menu.Objects, 
												menu.Placer);
	// Set Scrolling Indexes
	SetScrollingCoordinatesOf(	menu,
								menu.Scrolling[1],
								menu.Scrolling[0],
								menu.Objects.length, 
								menu.Objects[0].length);

	MenuManager.stack.push( menu );

	// Cursor DOM
    menu.Cursor = (menu.cursorGen) ? menu.cursorGen(menu) : null

    //menu.Matrix.cursorUpdate();
}

_RemoveMenu = () => {
	// this line needs some tweaking...
	Bridge.DOM.Remove( ReturnTopMenu().Ref );
	MenuManager.stack.pop();

    // let's play some animations...
    MenuManager.Animator.add(() => { 
    	_Gm.setInput(ReturnTopMenu().Input, 4);
    	_Gm.inputIsEnabled = true; 
    });
    // set proper input
    
};

menuAnimationAndInputLoop = () => {
	if (MenuManager.Animator.Pool.length) {
		// no input here...
		_Gm.inputIsEnabled = false;
		MenuManager.Animator.update();
	}	
};

menuStandardPopUpAnimation = (menu) => {

    menu.offsetH = menu.Ref.offsetHeight;
    menu.offsetW = menu.Ref.offsetWidth;
    menu.offsetL = menu.Ref.offsetLeft;
    menu.offsetT = menu.Ref.offsetTop;

	// let's play some animations...
	MenuManager.Animator.add(() => { 
    	menu.Ref.style.width = 0;
    	menu.Ref.style.height = 0;

    });

    MenuManager.Animator.add(() => { 
    	menu.Ref.style.width = menu.offsetW / 4 + 'px';
    	menu.Ref.style.height = menu.offsetH / 4 + 'px';
    });

    MenuManager.Animator.add(() => { 
    	menu.Ref.style.width = menu.offsetW / 2 + 'px';
    	menu.Ref.style.height = menu.offsetH / 2 + 'px';
    });

    MenuManager.Animator.add(() => { 
    	menu.Ref.style.width = menu.offsetW + 'px';
    	menu.Ref.style.height = menu.offsetH + 'px';
    });

};