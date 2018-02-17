//
const _min_Number_Of_Battle_Menu = 2,
      battleBannerGenerator      = {
        Name:   'Banner',
        width:  '50%', 
        height: '10%',
        x:      '25%', 
        y:      '2%'
};


//
_removeBattleMenu = () => {
    if (MenuManager.stack.length >_min_Number_Of_Battle_Menu) { 
        _RemoveMenu();
        // this need some tweaking...
        ReturnTopMenu().Cursor.appendChild( MenuManager.Cursor );
    }
};

//
_removeAllBattleMenus = () => {
    while (MenuManager.stack.length > _min_Number_Of_Battle_Menu - 1) { 
        _RemoveMenu();
    }
};

//
loadBattleBanner = () => {
    MenuManager.battleBanner = setStandardMenuDOM(battleBannerGenerator);

    MenuManager.battleBanner.firstChild.style.background = _Menu_Options.bannerBackgroudColor;

    console.log(MenuManager.battleBanner.firstChild.style.background);

    MenuManager.battleBanner.text = Bridge.DOM.Txt('', { 
        left:   '0%',
        top:    '0%',
        width:  '100%',
        height: '100%',

        textAlign:  'center',
        margin:     'auto',
        fontFamily: 'FFVIFont',
        lineHeight: '200%',
        fontSize:   '140%',

        textShadow  : _Menu_Options.shadowText,
        color       : _Menu_Options.bannerTextColor

    }, MenuManager.battleBanner);
    removeBanner();
};

//
setBannerWithText = (txt) => { setBannerVisibility('visible'); MenuManager.battleBanner.text.innerHTML = txt; };

//
removeBanner = () => { setBannerVisibility('hidden'); };

//
setBannerVisibility = (v) => { MenuManager.battleBanner.style.visibility = v; };