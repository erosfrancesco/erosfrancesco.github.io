import BattleDamage  from './battle-damage.js';
import FFVIText  from '../menu_API/ffvi-text.js';

export default PhaserDamage() {
    constructor(options) {
        const {value, types, Sprite, x, y} = options;
        types.value = value;
        super(types);
        
        const PhaserText = new FFVIText({});
        const posX = x || Sprite.x + Sprite.width / 2;
        const posY = y || Sprite.y + 3 * Sprite.height / 5;
        
        
        this.PlayerSprite = Sprite;
        
        PhaserText.visible = false;
        PhaserText.text = text;
        PhaserText.x = posX;
        PhaserText.y = posY;
        
        
        this.TextSprite = PhaserText;
    }
    
    display() {
        
        this.TextSprite.visibility = true;
        
        // tween
        const animationConfig = {
            targets: Sprite,
            y: Sprite.y - 50,
            ease: 'Power1',
            duration: 2000,
            yoyo: true
        };
        this.TextSprite.__displayDamageAnimation = this.Sprite.scene.tween.add(animationConfig);
        
        
    }
}
