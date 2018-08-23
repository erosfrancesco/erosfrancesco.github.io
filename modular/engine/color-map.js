export default class ColorsMap {
    constructor() {}


    static get colors() {
        return {
            aqua:    '#7fdbff',
            blue:    '#0074d9',
            lime:    '#01ff70',
            navy:    '#001f3f',
            teal:    '#39cccc',
            olive:   '#3d9970',
            green:   '#2ecc40',
            red:     '#ff4136',
            maroon:  '#85144b',
            orange:  '#ff851b',
            purple:  '#b10dc9',
            yellow:  '#ffdc00',
            fuchsia: '#f012be',
            gray:    '#aaaaaa',
            white:   '#ffffff',
            black:   '#111111',
            silver:  '#dddddd',
            whiteD2: '#d2d2d2',
            shadow:  '#3d333d'
        };
    }
    
    

    static stringTo0x(string) {

        if (!string) { return 0xffffff };
        return '0x' + string.substr(1);
    }

    static toHex(color) {
        let string = this.colors[color];
        return this.stringTo0x(string);
    }
}