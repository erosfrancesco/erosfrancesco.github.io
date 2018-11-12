export default class MenuDialog {
	constructor({symbolMap}) {

		this.visible = false;
		this.textLines = [];
		this.actions = [];
		this.symbolMap = symbolMap;
	}

	// format and show
	parse(stringToBeParsed, callback) {
		this.parser(stringToBeParsed, arr => {
			this.actions = arr;
			this.showView(arr, 0, callback);
		});
	}

	showView(arr, arrIndex = 0, callback) {
		if (!arr[arrIndex]) {
			callback(arr);
			return;
		}

		const {text, symbol, index} = arr[arrIndex];
		const viewMode = this.symbolMap[symbol] || this.normal;
		
		viewMode(text, () => {
			arrIndex++;
			this.showView(arr, arrIndex, callback);
		});
	}

	//
	parser(stringToBeParsed, callback, arr = []) {
		this.computeParsedObject(stringToBeParsed, arr.length, obj => {
			const {text, symbol} = obj;
			const [start, end] = (symbol === 'normal') ? ['', ''] : this.computeChunkDelimiters(symbol);
			const str = stringToBeParsed.replace(start + text + end, '');

			arr.push(obj);
			(str && str.length) ? this.parser(str, callback, arr) : callback(arr);			
		});
	}

	computeParsedObject(stringToBeParsed, index, callback) {

		const obj = this.computeFirstParsedObject(stringToBeParsed);
		let {text, symbol} = obj;
		

		if (!text) {
			text = stringToBeParsed;
			symbol = 'normal';
		}
		/**/

		callback({text, symbol, index});
	}

	
	//
	computeFirstParsedObject(stringToBeParsed) {

		let obj = {
			text: null, 
			symbol: null, 
			chunk: null
		};

		const symbolName = this.computeFirstSymbolName(stringToBeParsed);
		if (!symbolName) {
			return obj;
		}
		const [start, end] = this.computeChunkDelimiters(symbolName);
		const regExp = new RegExp(start + "(.*?)" + end);
		const match = regExp.exec(stringToBeParsed);
		console.log(stringToBeParsed.match(regExp) )

		

		if (match && match[0]) {
			obj.text = match[1];
			obj.symbol = symbolName;
			obj.chunk = match[0];
		}

		return obj;
	}

	computeChunkDelimiters(symbolName) {
		return [
			'<' + symbolName + '>',
			'</' + symbolName + '>'
		];
	}


	//
	computeFirstSymbolName(text) {
		const regExp = new RegExp();
		const match = /<\/(.*?)>/.exec(text);
		return (match && match[1]);
	}

	computeFirstStringChunk(text) {
		const regExp = new RegExp();
		const match = /<(.*?)>/.exec(text);
		return (match && match[0]);
	}
}

/*

const text = '<letter>Dialog</letter><letter>Dialog1</letter><letter>Dialo</letter><word>Hello</word>';

const a = new MenuDialog({
	symbolMap: {
		"normal": (t, c) => { c(); },
		"letter": (t, c) => { c(); },
		"word":   (t, c) => { c(); }
	}
});



a.parse(text, (arr) => {
	console.log(arr);
});

/**/
