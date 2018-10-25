import DefaultBattleCommand from '../command-default.js';
import FightAction from './action.js';

export default class FightCommand extends DefaultBattleCommand {
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

