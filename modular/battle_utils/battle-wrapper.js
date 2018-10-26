// Character has been moved
import AtbBattle from './atb-battle.js';
import FFVIDialog from '../menu_API/ffvi-dialog.js';
//import BattleBanner from '../battle-ui/battle-banner-wrapper.js';

// wrapper for AtbBattle
export default class BattleWrapper extends AtbBattle {
	constructor(options) {
		super(options);
		this.banner = new FFVIDialog(options);
	}

	start(callback) {
		// set watchDog
		this.watchDog = 0;
		this.counter = 0;
		this.forAllCharacters(() => { this.watchDog++; });

		this.forAllCharacters((character, index) => { 
			character.Animations.entrance = character.Animations.entrance || function(x, c, cb) { cb(); }
			character.Animations.entrance(this, character, () => {
				this.counter++;
				if (this.counter >= this.watchDog) callback();
			});
		});
	}

	resume() {
		this.Stopped = false;
	}

	stop() {
		this.Stopped = true;
	}
}