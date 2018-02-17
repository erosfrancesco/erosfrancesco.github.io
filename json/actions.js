/*Command for menus*/
let C_FIGHT={
        cmd: (player) => {

            // set selection phase
            setupSelectionPhaseWithTargets(PlayerPool.return_all());

            // set a reference to the player that will perform the action
            player.ActionToBeExecuted = (player, target) => {
                console.log( player.Name, 'is attacking ', target.Name);
            };

        },
        txt: 'FIGHT',
        sel: true,
    },

    C_ITEMS = {
        cmd: () => { MenuManager.push( _Item_Menu ); },
        txt: 'ITEMS',
        sel: true,
    },

    C_DEFEND = {
        cmd: () => {},
        txt: 'DEFEND',
        sel: true
    },

    C_RWCHNG = {
        cmd: () => {},
        txt: 'ROW',
        sel: true
    },

    C_NULL = {
        cmd: () => {},
        txt: '',
        sel: false
    };

_Battle_Menu.Objects = [
    [ C_FIGHT, C_NULL, C_NULL, C_ITEMS],
    [ C_NULL, C_DEFEND, C_RWCHNG, C_NULL]
];