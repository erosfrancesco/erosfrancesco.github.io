// Source and font paths. A nasty bi...
let _Ass = {};
const pathIndexMap = {
    this: './',
    asst: 'assets/',
    
    //font: 'sixTekBlack.ttf',
    curs: 'FFcurs.png',
    SprtPath: 'sprites',
    BackPath: 'Backgrounds'
};

const _constFontName = 'sixTekBlack.ttf';


function _Assign_Root_Directory(root) {
    Object.keys(pathIndexMap).forEach( (name) => { _Ass[name] = root + pathIndexMap[name]; });
}

/********************************************************************************************************/

function _Load_Text_Font(){

    var __Url = _Ass.asst + _constFontName,
        MyFontUrl = 'url("' + __Url + '")',
        headStyle = document.createElement('style'),
        fontFace = document.createTextNode('\
            @font-face {\
                font-family: "FFVIFont";\
                src: ' + MyFontUrl + ';\
                font-size: 200%;\
            }'
        );

    headStyle.appendChild(fontFace);
    document.head.appendChild(headStyle);
}

/********************************************************************************************************/


function _Load_From_Folder_Index(folderName, callback){
    _LoadJavascript(folderName + '/index', () => { _Load_WaterFall(_Array_Index_Load_, callback); });
}


function _Load_WaterFall(array, callback) {
    ArrayCounterIterator( (item, cb, count) => { _LoadJavascript(item, cb); }, array, callback || console.log );
}


function _LoadJavascript(name, callback) {
    let s = document.createElement('script');
    s.src = _Ass.this + name + '.js';
    s.onload = function () { callback(name, callback || callback); };
    document.body.appendChild(s);
}


function ArrayCounterIterator(fun, array, callback, count) {
    count = count || 0;
    fun(array[count], () => {
        count++;
        if (array[count]) { ArrayCounterIterator(fun, array, callback, count); } else { callback(); }
    }, count);
}


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



gameIndexArrayLoader[2] = ['../world/physicsRef',
    '../sprites/sprites',
    '../sprites/animator',
    '../sprites/spriteObjects',
    '../sprites/background'];

gameIndexArrayLoader[3] = [
    'battleobj/playerSprites',
    'menu/menu_battle_objects',
    'battleobj/headers/targets',
    'battleobj/headers/enemy_Headers',
    'battleobj/headers/battle_Headers',
    'battleobj/headers/commands_Headers',
    'battleobj/headers/damage_Headers',
    'battleobj/headers/status_Headers',
    'battleobj/Players/stats',
    'battleobj/Players/players',
    'battleobj/PhaseSystem/ATB',
    'battleobj/PhaseSystem/battleturn',
    'battleobj/PhaseSystem/action_Headers',
    'battleobj/PhaseSystem/action_manager',
    'battleobj/DOMObjects/Digits',
    'battleobj/DOMObjects/banner',
    'battleobj/DOMObjects/ATB'
]; // this one is pretty bulky


/**/