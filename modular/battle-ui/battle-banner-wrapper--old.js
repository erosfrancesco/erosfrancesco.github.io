import FFVIBattleBanner from './ffvi-battle-banner.js';


// TODO: scrollLine
export default class BattleBanner extends FFVIBattleBanner {
	constructor(options) {
		super(options);
		this.visible = false;
		//this.fullText = [];
	}

	show(text, callback) {
		this.text = text;
		this.callback = callback;

		setTimeout(() => {
			this.visible = false;
			this.callback();
		}, 1000);
	}


	showChunks(chunks, callback) {
		const a = [];
		
		chunks.forEach(chunk => a.push(chunk) );
		this.callback = callback;
		this.fullText = a;
	}


	showLetters(text, callback) {
		const a = [];
		const interval = 50;
		let fooText = '';
		
		for(let i=0; i <= text.length; i++) {
			fooText += text.charAt(i);
			a.push({text: fooText, interval});
		}
		this.showChunks(a, callback);
	}



	set fullText(a) {
		this._fullText = a;
		this.visible = true;

		fullTextIterator(this._fullText, 0, text => {
			this.text = text;
		}, () => {
			this._fullText = false;
			this.visible = false;
			this.callback();
		});
	}
}



function fullTextIterator(fullText, i, iterator, callback) {

	const {text, interval} = fullText[i];
	
	setTimeout(() => {
		i++;
		if (fullText[i]) {
			iterator(text);
			fullTextIterator(fullText, i, iterator, callback);
		}else{
			setTimeout(callback, 1000);
		}
	}, interval);
}

