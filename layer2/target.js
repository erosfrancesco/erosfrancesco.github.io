/**
 * Target phase.
 * After an action is selected by menu, usually there is need to select a target for that action too...
 * Players as menu items.
 */

/**
 *
 */
let _Menu_Target_Array_Input = [];

_Menu_Target_Array_Input['left']  = _Menu_Movement_Array_Input['down'];
_Menu_Target_Array_Input['right'] = _Menu_Movement_Array_Input['up'];

_Menu_Target_Array_Input['z']     = () => {
    _Gm.scene.remove( ReturnTopMenu().Cursor );
    _removeBattleMenu();
};

_Menu_Target_Array_Input['x']     = () => {

    _Gm.scene.remove( ReturnTopMenu().Cursor );

    // retrieve the targets
    let targets = ReturnTopMenu().Cursor.target;
    if (!(typeof targets === 'array')) { targets = [targets]; }

    //console.log('Adding...');
    // set the player action
    _AddActionToStack({
            performer: 		[CurrentCharacter],
            targets: 		targets,

            setGrahicEfx: (target, player, callback) => { console.log('Loading action starting'); callback(); },
            checkMiss:    (target, player, callback) => { console.log('Check on: ', target.Name); callback(); },
            playGraphics: (target, player, callback) => { console.log('Play damage on: ', target.Name); callback(); },
            calcDamages:  (target, player, callback) => { console.log('Calc damage on: ', target.Name);
                let damage = 102;
                setStatOf(target, 'lif', returnStatOf(target, 'lif') - damage);
                UpdateATBLifeAndManaOf(target);
                
                callback(); 
            },
            showDamages:  (target, player, callback) => { console.log('Show damage on: ', target.Name); callback(); },
            end	: 		  (target, player, callback) => { console.log('Play on: ', target.Name); callback(); },
        });

    // go to action phase
    _endCharacterTurn(CurrentCharacter);
};

/**
 *
 */
let _Target_Menu = {

    Name: 'Targets',
    Objects: [],

    cursorGen: SetStandardTargetCursor,
    scrollerGen: setStandardScrollingDOM,
    Input: _Menu_Target_Array_Input,
    Placer: (top, left, width, height, scrollerW, obj, indxX, indxY) => { return obj; },

    width:'0%', height:'0%',
    x:'-1000%', y:'0%'
};

/**
 *
 */
function setupSelectionPhaseWithTargets(targetArray){

    // set the menu input.
    let s = deepClone(_Target_Menu);
    s.Objects = [targetArray];
    s.Scrolling = [ targetArray.length, 1];
    //console.log(targetArray);
    MenuManager.push(s);
}

function SetStandardTargetCursor(menuGen) {

    // cursor
    let Cursor = SpriteSheet({
        img: Cursor_Sprite.src,
        width: '32',
        height: '32',
        x: -1000
    });

    setStandardCursorIndexes(menuGen, menuGen.Matrix, Cursor);

    // this function is important
    Cursor.update = (dx, dy) => {

        // set cursor target
        Cursor.target = menuGen.Matrix.DOMMatrix[dx][dy];

        let targetDOM = Cursor.target.spriteSheet.Ref,
            width     = targetDOM.width;

        if (Cursor.target.Enemy) {
            Cursor.Texture.repeat.x = -1;
            SpritePosition(Cursor,  targetDOM.position.x - width / 4, targetDOM.position.y, targetDOM.position.z);
        }else{
            Cursor.Texture.repeat.x = 1;
            SpritePosition(Cursor,  targetDOM.position.x + width / 4, targetDOM.position.y, targetDOM.position.z);
        }
        
        /*
        // test purposes
        console.log(menuGen.Matrix.sw, 
                    menuGen.Matrix.sh,
                    menuGen.Matrix.sx,
                    menuGen.Matrix.sy, 
                    dx, dy);
        /**/
    };

    return Cursor;
}
