/************************************************************************************
 * Cursor sprite
 ************************************************************************************/
// Image src. Base64.
let cursorImageSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeT\A' +
    'AAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AUPEyszndOvUgAAAPZJREFUWMPVV7sRgzAMfeYyBCvEG7AGK3gEWpe0jOAVWIMNnDJl2CI\p' +
    'ciqsC/HnzFm8EvsOvacnWVJIRN/f3//O9/2hUIAOjaFSmS+rAwCMwxCcz+773dmlSInmCtxizM08BczXbQMAeO8D5nTP2SXLK3I8QIwpwljuCa\R' +
    'IKqbRBEq0V4DnmufUGlP1h7xq5CjwfPkgQq11cPHIA9wLVB1H4P1CXh/gzFPdzvvCdfpAqgdywetd/lvAc0w5TVUi5n75ChwxyGWWOxc0V6D7x\S' +
    'BWy6cGIG4eoFexdu7lT8WxPaAUct8CMWUoZi84G3Km4lruv+x2/AHRzYYAYoxrTwAAAABJRU5ErkJggg==';

// Cursor Sprite Generator Object
let Cursor_Sprite = {
    src: cursorImageSource,
    framn: [1, 1],
    width: 16,
    height: 16
};


/************************************************************************************
 * Standard Cursor DOM
 ************************************************************************************/
setStandardCursorDOM = (menu) => {

    // cursor DOM
    let Cursor = Bridge.DOM.Div('0%', '5%', '32px', '32px', {
        position: 'absolute',
        left: '5%'
    }, menu.Ref);

    // DOM attachment and stuff...
    Cursor.appendChild( MenuManager.Cursor );

    setStandardCursorIndexes(menu, menu.Matrix, Cursor);

    return Cursor;
};


/************************************************************************************
 * Standard Cursor Methods and Indexing
 ************************************************************************************/
setStandardCursorIndexes = (menu, scroller, cursor) => {

	cursor.cx = 0; // cursor x
	cursor.cy = 0; // cursor y

	/************************************************************************************
	 * Cursor moving
	 ************************************************************************************/
	cursor.moveUp    = () => { cursor.cy--; }
	cursor.moveDown  = () => { cursor.cy++; }
	cursor.moveLeft  = () => { cursor.cx++; }
	cursor.moveRight = () => { cursor.cx--; }

    cursor.update  = (dx, dy) => {
	    cursor.target = menu.Matrix.DOMMatrix[dx][dy];
        cursor.target.appendChild(cursor);
	};
};
