resetBattleGraphicAndLoops = () => {
    _Remove_Battle_Loops();
    resetUID();
    resetThreejsScene();
};

_InitBattleObject = (battleObject) => {

    // set menu and banner
    MenuManager.push( _Init_Menu );
    loadBattleBanner();

    // this loop takes care of menu, input and atb
    _Gm.machine.assign( 'ACTIVE TIME LOOP', ActiveTimeFlowLoop);
    // this loop takes care of actions.
    _Gm.machine.assign( 'ACTIVE ACTION LOOP', ActiveActionFlowLoop);
    // this resolve action. Should be tweaked and integrated
    _Gm.machine.assign( 'ACTIVE RESOLVER LOOP', () => { 
        General_Action_Resolver.update();
        PlayerPool.execute_for_every_alive((player) => { player.Clock.update(); }); 
    });
    // menu input-animations switching
    _Gm.machine.assign( 'ACTIVE MENU ANIMATION LOOP', menuAnimationAndInputLoop);
    

    // load all characters and set their clocks
    Object.keys(battleObject.players).forEach( keyPlayer => {
        _Load_Player_From_Object_Into_Battle(battleObject.players[keyPlayer], false);
    });

    // load all enemys and set their clocks
    Object.keys(battleObject.enemys).forEach( keyPlayer => {
        _Load_Player_From_Object_Into_Battle(battleObject.enemys[keyPlayer], true);
    });

    // load background
    
    _DrawSpriteSheet(battleObject.background.spritesheet,
                0, 68, -100,
                1150, 560,
                battleObject.background.source,
                battleObject.background.animation);
    /**/
};

_Load_Player_From_Object_Into_Battle = (player, enemy) => {

    // set player object
    player.object.Enemy = enemy;
    _LoadObjectPlayer(player.object);

    // draw player spritesheet
    player.object.spriteSheet = player.object.SpriteSource(player.x, player.y, player.z);
    //player.object.spriteSheet.Ref.material.color = {r: 1, g: 0, b: 0.5};
    
    if (player.object.Enemy) {  player.object.spriteSheet.Ref.rotation.y = -Math.PI; }
};

_Remove_Battle_Loops = () => {
    _Gm.machine.remove( 'ACTIVE TIME LOOP');
    _Gm.machine.remove( 'ACTIVE ACTION LOOP');
    _Gm.machine.remove( 'ACTIVE RESOLVER LOOP');
    _Gm.machine.remove( 'ACTIVE MENU ANIMATION LOOP');
};
