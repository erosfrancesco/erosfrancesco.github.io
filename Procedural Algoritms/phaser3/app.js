const margin = "30px"

import config from "./config.js";

const initApp = () => {
    window.addEventListener('resize', e => resizeApp() ); 
    resizeApp();
}

// Resize
const resizeApp = () => {
    const div = document.getElementById('game-container');
    
    if (!div) { return; }

    const ratio = config.height / config.width;

    ( window.innerHeight > (window.innerWidth * ratio) ) ? resizeDivByHeight(div, ratio) : resizeDivByWidth(div, ratio);
   
}

const resizeDivByWidth = (div, ratio) => {
	div.style.height = "calc(100% - " + margin + ")";
    div.style.width  = "calc(" + (100 / ratio) + "vh - " + margin + ")";
    div.style.marginTop  = "calc(50% - (" + div.style.height + " / 2) - (" + margin + ") / 2)";
}

const resizeDivByHeight = (div, ratio) => {
	div.style.width  = "calc(100% - " + margin + ")";
    div.style.height = "calc(" + (100 * ratio) + "vw - " + margin + ")";
    div.style.marginTop  = "calc(50vh - (" + div.style.height + " / 2) - (" + margin + ") / 2)";
}

// Create Wrapper Div
const createWrapper = () => {

        // create css
        const sheet = (function() {
            const style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
        
            return style.sheet;
        })();

        // css rules
        const cssRuleStringDiv = '#' + config.parent + ' { \
            margin: 0 auto; \
            padding: 0; \
            display: flex; \
            align-items: center; \
            justify-content: center; \
        }';
        const cssRuleStringCanvas = '#' + config.parent + '>canvas { \
            width: 100%; \
            height: 100%; \
            border-radius: 5px; \
        }';
        sheet.insertRule(cssRuleStringDiv, 0);
        sheet.insertRule(cssRuleStringCanvas, 1);

        // create wrapper
        const div = document.createElement("div");
        div.id = config.parent;
        document.body.appendChild(div);    
}

createWrapper();
initApp();

const game = new Phaser.Game(config);

export default game;