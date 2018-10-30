import DefaultBattleCommand from '../command-default.js';
import FightAction from './action.js';

export default class FightCommand extends DefaultBattleCommand {
    constructor(options) {

        super({ label: 'FIGHT' });

        this.action = options => {

            const {player, battle} = options;
            const {Players, Enemies, Animator} = battle;
            
            player.Action = new FightAction({
                executor: {
                    pointer: registry.findIndex(p => p.id === player.id), registry
                }, 
                battle
            });

            // build player action
            Animator.addCharacterAction(player);
            
            // compute available targets and set the target menu
            let targets = [];
            Players.forEach(p => targets.push(p));
            Enemies.forEach(p => targets.push(p));

            battle.UI.UIMenus.add( new TargetMenu({ scene: battle.scene, targets, battle }) );
        };
    }
}

