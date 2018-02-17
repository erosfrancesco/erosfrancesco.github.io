let _Menu_Movement_Array_Input = [];

// Left and right are inverted...


_Menu_Up_Cursor_W_Scrolling = (menu) => {

	let wrapper = menu.Matrix,
	    cursor  = menu.Cursor;

	// if cursor is at the end, don't do anything.
	if (cursor.cy==0) {  
		//console.log('Im at end up.'); 
		cursor.update(cursor.cx, cursor.cy);
		return; 
	}

	// check scrolling up
	if (!(cursor.cy > wrapper.sy)) {
		//console.log('Scrolling up');
		wrapper.moveUp();
		wrapper.update();
	}

	// move cursor and update it
	cursor.moveUp();
	cursor.update(cursor.cx, cursor.cy);
}

_Menu_Down_Cursor_W_Scrolling = (menu) => {

	let wrapper = menu.Matrix,
	    cursor  = menu.Cursor;

	// if cursor is at the end, don't do anything.
	if (cursor.cy + wrapper.sy + 1 >= wrapper.sh) {
		//console.log('Im at end down.'); 
		cursor.update(cursor.cx, cursor.cy);
		return; 
	}

	// check scrolling down
	// WATCH THIS! IT WAS cursor.cy + 1.
	if ( !(cursor.cy < wrapper.wh) ) {
		//console.log('Scrolling down');
		wrapper.moveDown();
		wrapper.update();
	}
	
	// move cursor and update it
	cursor.moveDown();
	cursor.update(cursor.cx, cursor.cy);
}


_Menu_Left_Cursor_W_Scrolling = (menu) => {
	
	let wrapper = menu.Matrix,
	    cursor  = menu.Cursor;
	
	// if cursor is at the end, don't do anything.
	if (cursor.cx == 0) {
		//console.log('Im at end.'); 
		cursor.update(cursor.cx, cursor.cy);
		return; 
	}

	// check scrolling left
	if ( !(wrapper.cx > wrapper.sx) ) {
		//console.log('Scrolling left');
		wrapper.moveRight();
		wrapper.update();
	}

	// move cursor and update it
	cursor.moveRight();
	cursor.update(cursor.cx, cursor.cy);
}

_Menu_Right_Cursor_W_Scrolling = (menu) => {
	
	let wrapper = menu.Matrix,
	    cursor  = menu.Cursor;

	// if cursor is at the end, don't do anything.
	if ( cursor.cx + 1 >= wrapper.sw ) { 
		//console.log('Im at end.'); 
		cursor.update(cursor.cx, cursor.cy);
		return;  
	}

	// check scrolling right
	if ( !(cursor.cx + 1 < wrapper.ww) ) {
		//console.log('Scrolling right');
		wrapper.moveLeft();
		wrapper.update();
	}

	// move cursor and update it
	cursor.moveLeft();
	cursor.update(cursor.cx, cursor.cy);
}

_Menu_Movement_Array_Input['up'] 	= () => { _Menu_Up_Cursor_W_Scrolling(ReturnTopMenu()); }
_Menu_Movement_Array_Input['left'] 	= () => { _Menu_Left_Cursor_W_Scrolling(ReturnTopMenu()); }
_Menu_Movement_Array_Input['down'] 	= () => { _Menu_Down_Cursor_W_Scrolling(ReturnTopMenu()); }
_Menu_Movement_Array_Input['right'] = () => { _Menu_Right_Cursor_W_Scrolling(ReturnTopMenu()); }

_Menu_Movement_Array_Input['x'] 	= () => { ReturnTopMenu().Cursor.target.cmd(CurrentCharacter); }
_Menu_Movement_Array_Input['z']		= () => { _removeBattleMenu(); }


