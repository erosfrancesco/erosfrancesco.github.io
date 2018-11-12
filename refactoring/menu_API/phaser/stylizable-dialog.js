import MenuDialog from '../logic/menu-dialog.js';
import StylizableMenu from './menu.js';


// menu
export default class StylizableDialog extends StylizableMenu {
	constructor(options) {
		
		options.noArrows = true;

		super(options);
		
		this.dialog = new MenuDialog({
			symbolMap: {
				"normal": (t, c) => { this.normal(t, c); },
				"letter": (t, c) => { this.letter(t, c); },
				"word":   (t, c) => { this.word(t, c); }
			}
		});
		
		this.visible = false;

		const a = this.computeTextGraphic();
		this.items[0].push(a);
	}

	set visible(v) {
		if (this.background) {
			this.background.sprite.visible = v;
		}

		this.itemIterator(i => {
			if (i) {
				i.visible = v;
			}
		})
	}

	parse(text, callback) {
		this.visible = true;
		this.dialog.parse(text, (chunks) => {
			setTimeout(() => { 
				this.visible = false; 
				callback(); 
			}, 1000);
		});
	}

	computeTextGraphic() { }

	// views
	normal(text, callback) { 
		this.items[0][0].text = text;
		setTimeout(callback, 100 * text.length);
	}

	letter(text, callback, i=0) {	

		if (!text.charAt(i)) {
			setTimeout(callback, 1000); 
			return; 
		}
		
		const sprite = this.items[0][0];
		const t = sprite.text + text.charAt(i);
		sprite.text = t;
		
		setTimeout(() => { i++; this.letter(text, callback, i); }, 100); 
	}

	word(text, callback, i=0) { 

		if (!text[i]) { 
			setTimeout(callback, 1000); 
			return; 
		}

		// split by space
		if (typeof text === 'string') {
			text = text.split(' ');
		}
		
		const sprite = this.items[0][0];
		const t = sprite.text + text[i] + ' ';
		sprite.text = t;

		setTimeout(() => { i++; this.word(text, callback, i); }, 1000);
	}
}