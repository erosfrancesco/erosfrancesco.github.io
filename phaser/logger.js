
class Logger {
    constructor() {
        let div = document.createElement("div");
        
        div.style.position = 'absolute';
        div.style.top = '10%';
        div.style.left = '10%';
        div.style.width = '80%';
        div.style.height = '80%';
        div.style.border = 'solid 1px black';

        document.body.appendChild(div);
        this.div = div; 
        //this.text = 'hello logs';
    }

    add(v) {
        console.log(v);
        this.text += v + '<br>';
    }

    set text(v) {
        this.div.innerHTML = v;
    }

    get text() {
        return this.div.innerHTML;
    }

}

let HelloLogger = new Logger();

function Log(text) {
    HelloLogger.add(text);
}

function ClearLog() {
    HelloLogger.text = '';
}
