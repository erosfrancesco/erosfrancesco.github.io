DOMElementCreate = (params) => {

	params.parent  = params.parent  || _Gm.UID;
	params.element = params.element || 'div';

	let sfoo        = document.createElement(params.element),
	    styleString = DOMStyleParser(params.style);

	params.parent.appendChild(sfoo);
	sfoo.style = styleString;
	
	// build standard method for DOM manipulation
	BridgeDOMStandardMethods(sfoo);

	return sfoo;
}


DOMStyleParser = (styleObj) => {
	
	styleObj = styleObj || {};
	
	let styleString = '';
	
	Object.keys(styleObj).forEach(name => { styleString += ConvertToKebabCase(name) + ':' + styleObj[name] + ';'; });
	return styleString;
}


ConvertToKebabCase = (string) => { return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(); }

/***********************************************************************************************************/
BridgeDOMStandardMethods = (DOMobj) => {
	DOMobj.Visible = (bool) => {
		if (bool) {
			DOMobj.style.visibility = 'visible';
		}else{
			DOMobj.style.visibility = 'hidden';
		}
	};
};
/***********************************************************************************************************/

const LayerBaseBridge = {
	DOM:{
		Div: function(params){

			params.element = 'div';
			let sfoo = DOMElementCreate(params);
			return sfoo;
		},
        
		Img: function(src, params){

			let p = {
				element : 'img',
				style 	: params
			};

			let sfoo = DOMElementCreate(p);
			sfoo.src = src;
			return sfoo;
		},
        
		Txt: function(){},
	}
};

const Bridge = {
	DOM:{

		Remove: function(obj){

			let s = (typeof obj === "string") ? document.getElementById(obj) : obj
			let err = s.parentNode ? s.parentNode.removeChild(s) : false
            return err;
		},

		Div: function(x, y, wid, hei, style, parent){
			
			let parameters = { style: style || {} };
			parameters.parent = parent;

			parameters.style.position = 'absolute';
			parameters.style.height = hei;
			parameters.style.width = wid;
			parameters.style.left = x;
			parameters.style.top = y;

			let sfoo = LayerBaseBridge.DOM.Div(parameters);
			return sfoo;
		},

		Img: LayerBaseBridge.DOM.Img,
        
		Txt: function(text, style, parent){

			let parameters = { style: style || {} };
			parameters.parent = parent;
			parameters.style.position = 'absolute';

			let sfoo = LayerBaseBridge.DOM.Div(parameters);
			sfoo.innerHTML = text;
			return sfoo;
		},

	}
};
