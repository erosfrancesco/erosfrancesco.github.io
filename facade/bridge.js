function DOMElementCreate(params){

	params.parent = params.parent || _Gm.UID;//document.body;
	params.element = params.element || 'div';

	var sfoo = document.createElement(params.element);
	var styleString = DOMStyleParser(params.style);
	params.parent.appendChild(sfoo);
	sfoo.style = styleString;

	return sfoo;
}


function DOMStyleParser(styleObj){
	styleObj = styleObj || {};
	var styleString = '';
	Object.keys(styleObj).forEach(name => { styleString += ConvertToKebabCase(name) + ':' + styleObj[name] + ';'; });
	return styleString;
}


function ConvertToKebabCase(string){ return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(); }



const LayerBaseBridge = {
	DOM:{
		Div: function(params){

			params.element = 'div';
			var sfoo = DOMElementCreate(params);
			return sfoo;
		},
        
		Img: function(src, params){

			var p = {
				element : 'img',
				style 	: params
			};

			var sfoo = DOMElementCreate(p);
			sfoo.src = src;
			return sfoo;
		},
        
		Txt: function(){},
	}
};

const Bridge = {
	DOM:{

		Remove: function(obj){

			var s = (typeof obj === "string") ? document.getElementById(obj) : obj
			var err = s.parentNode ? s.parentNode.removeChild(s) : false
            return err;
		},

		Div: function(x, y, wid, hei, style, parent){
			
			var parameters = { style: style || {} };
			parameters.parent = parent;

			parameters.style.position = 'absolute';
			parameters.style.height = hei;
			parameters.style.width = wid;
			parameters.style.left = x;
			parameters.style.top = y;

			var sfoo = LayerBaseBridge.DOM.Div(parameters);
			return sfoo;
		},

		Img: LayerBaseBridge.DOM.Img,
        
		Txt: function(text, style, parent){

			var parameters = { style: style || {} };
			parameters.parent = parent;
			parameters.style.position = 'absolute';

			var sfoo = LayerBaseBridge.DOM.Div(parameters);
			sfoo.innerHTML = text;
			return sfoo;
		},

	}
};
