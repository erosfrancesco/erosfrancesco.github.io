// import modules (es6)
import StylizedMenuBackground from './phaser/stylizable-background.js';
import ColorMap from '../colorMap.js';


// return a FFVI-style background
const DOMbackgroundFFVIStyling = ({ scene, width, height, x, y }) => {

    const wrapper = document.createElement('div');
    wrapper.style.width = width + "px";
    wrapper.style.height = height + "px";
    wrapper.style.borderRadius = "10px";
    wrapper.style.backgroundColor = "rgba(73,73,203,1)";
    wrapper.style.opacity = 1;


    const gradient = document.createElement('div');
    wrapper.appendChild(gradient);

    gradient.style.borderRadius = "10px";
    gradient.style.background = "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.85) 100%)";
    gradient.style.height = "100%";
    gradient.style.width = "100%";
    gradient.style.zIndex = 1;


    const border = document.createElement('div');
    wrapper.appendChild(border);

    border.style.width = "calc(100% - 12px)";
    border.style.height = "calc(100% - 12px)";
    border.style.position = "absolute";
    border.style.top = "6px";
    border.style.left = "6px";
    border.style.boxShadow = "inset 0px 0px 2px 2px #252525, 0px 0px 1px 4px #D2D2D2, 0px 0px 0px 6px #252525";
    border.style.borderRadius = "4px";
    border.style.opacity = 0.8;
    border.style.zIndex = 2;


    return this.add.dom(x, y, wrapper);
}


export default class DOMFFVIMenuBackground extends StylizedMenuBackground {
    constructor(options) {
        options.styling = DOMbackgroundFFVIStyling;
        super(options);
    }
}


