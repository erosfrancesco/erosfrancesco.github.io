// Character has been moved
import AtbBattle from './atb-battle.js';
import PlayerBattleMenu from '../battle-ui/menus/battle-menu.js'

// only player there, duh.
// create player battle menu
function SetBattleTurn(player, battle, scene) {
    let a = new PlayerBattleMenu({battle, player, scene});
    return a;

}


export default SetBattleTurn;