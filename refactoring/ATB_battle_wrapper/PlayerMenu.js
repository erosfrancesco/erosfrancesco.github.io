class PlayerMenu {
	constructor(options) {

        let {scene, player, sceneHeight, numberOfPlayers, playerIndex } = options;


        this.playerIndex = playerIndex;

        let { width, height } = this.computeArea({ player, sceneHeight, numberOfPlayers });
        let { x, y } = this.computePosition({ player, height });
        x -= width / 2;
        y += height / 2;
        let textHeight = 40;


        this.background = new FFVIMenuBackground({
            scene, 
            x, y, 
            width, height,
            noArrows: true
        });



 		this.item1 = new FFVIText({scene, width, height: textHeight, x: 0, y: -textHeight, text: player.name});
        this.item2 = new FFVIText({scene, width, height: textHeight, x: 0, y: 0, text: ''});
        this.wrapper = scene.add.container(x, y);
        this.wrapper.add(this.item1.sprite);
        this.wrapper.add(this.item2.sprite);



        this.atb = new ATBPlayerBridge({scene, x: x - 80, y: y + textHeight, width: 160});
        this.atb.init(player);



        //this.atb.bar.on('ATBDone', e => { console.log('bum', this.player.name); });
        
        this.playerInfo = player.life + ' / ' + player.mana;
        this.player = player;

        this.player.onDamage = () => { console.log('ouch'); this.playerInfo = player.life + ' / ' + player.mana; }
	}

    get player() {
        return this._player;
    }

    set player(v) {
        this._player = v;
    }

	get playerInfo() {
		return this.item2.text;
	}

	set playerInfo(v) {
		this.item2.text = v;
	}


    get playerIndex() {
        return this._playerIndex;
    }

    set playerIndex(v) {
        this._playerIndex = v;
    }

    turnUpdate() {
        this.atb.update(this.player);
    }


	computeArea(options) {

		let  { player, sceneHeight, numberOfPlayers } = options;

		return {width: 200, height: sceneHeight / numberOfPlayers }
	}

	computePosition(options) {

		let {player, height} = options;

		return { x: 900, y: height * this.playerIndex };
	
	}

}
