/************************************************************************************
 * Standard Scrolling Indexing and Methods
 ************************************************************************************/
ReturnCurrentMenuWrapper = () => { return _Gm.UID; }

setStandardScrollingDOM = (menu) => {

	let parent 		  = menu.Ref, 
		limit  		  = menu.Scrolling, 
		objectsMatrix = menu.Objects, 
		placer 		  = menu.Placer || console.log;

	let matrixX     = objectsMatrix.length,
	    matrixY     = objectsMatrix[0].length,
	    wrappHeight = 100 * ( matrixY / limit[0] ),
		wrappWidth  = 100 * ( matrixX / limit[1] ),
	    width       = 100 / matrixX,
	    height      = 100 / matrixY,
	    scrollerW   = Bridge.DOM.Div('0%', '0%', wrappWidth + '%', wrappHeight + '%', {}, parent);

	scrollerW.DOMMatrix = [];

	objectsMatrix.forEach((arr, indxX) => {

		scrollerW.DOMMatrix.push([]);
		arr.forEach((obj, indxY) => {
			
			let top    = height * indxY,
			    left   = width * indxX,
			    object = placer(top, left, width, height, scrollerW, obj, indxX, indxY);

			scrollerW.DOMMatrix[indxX].push(object);
		});

	});

	setStandardScrollingIndexes( menu, scrollerW );

	return scrollerW;
};

/************************************************************************************
 * Standard Scrolling Indexing and Methods
 ************************************************************************************/
setStandardScrollingIndexes = (menu, scroller) => {

	let	m = menu.Scrolling[1],
		n = menu.Scrolling[0],
		M = menu.Objects.length, 
		N = menu.Objects[0].length;

	scroller.sx = 0; // scroll x
	scroller.sy = 0; // scroll y

	scroller.sw = M; // scroll width
	scroller.sh = N; // scroll height
	scroller.ww = m; // wrapper width
	scroller.wh = n; // wrapper height

	/************************************************************************************
	 * Scrolling moving
	 ************************************************************************************/
	scroller.moveUp     = () => { scroller.sy--; };
	scroller.moveDown   = () => { scroller.sy++; };
	scroller.moveLeft   = () => { scroller.sx--; };
	scroller.moveRight  = () => { scroller.sx++; };

	/************************************************************************************
	 * Scrolling updating
	 ************************************************************************************/
	scroller.update = () => {
		scroller.style.top  = scroller.returnTop();
		scroller.style.left = scroller.returnLeft();
	};

	scroller.returnLeft = () => {
		let p = (scroller.sw + 1 <= scroller.ww) ? 0 : 100 * ( scroller.sx ) / scroller.ww
		return p + '%';
	};

	scroller.returnTop = () => {
		let p = (scroller.sh + 1 <= scroller.wh) ? 0 : 100 * ( scroller.sy ) / scroller.wh
		return -p + '%'; 
	};
}