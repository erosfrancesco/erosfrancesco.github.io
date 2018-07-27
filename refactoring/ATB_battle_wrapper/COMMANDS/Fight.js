class FightCommand extends _ATBCommandProto {
    constructor(options) {

        super({ label: 'FIGHT' });

        this.action = options => {

            let {player, battle, scene} = options;
            let {Players, Enemies, Animator} = battle;

            player.Action = new FightAction({executor: player, battle});

            // build player action
            Animator.addCharacterAction(player);
            
            // compute available targets and set the target menu
            let targets = [];
            Players.forEach(p => targets.push(p));
            Enemies.forEach(p => targets.push(p));

            battle.UI.UIMenus.add( new TargetMenu({ scene, targets, battle }) );
        };
    }
}





class FightAction extends _ATBActionProto {
    constructor(options) {
        super(options);
    }

    resolve(callback) {

        ApplySpriteTint(this.executor.Sprite, 0xff00ff);
        let damage = 140;

        setTimeout(() => {
            ApplySpriteTint(this.executor.Sprite, 0xffffff);

            this.targets.forEach(target => {
                ApplySpriteTint(target.Sprite, 0x00ff00);
                this.battle.displayPlayerDamage(target, damage);
            });

            setTimeout(() => {

                this.targets.forEach(target => {
                    ApplySpriteTint(target.Sprite, 0xffffff);
                    this.battle.applyDamageAndCheckLife(target, damage);
                });

                callback();

            }, 1000);
                            
        }, 1000);
    }
}


function ApplySpriteTint(sprite, color) {
    sprite.setTint(color);
}
