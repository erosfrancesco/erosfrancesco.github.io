export default class TurnSystem {
    
    constructor(options) {
        const {} = options;
        this.queue = [];
    }

    add(character) {
        this.queue.push(character);
    }

    remove() {
        this.queue.splice(0, 1);
    }

    update() {
        // this is where we add some character to the queue
    }

    get currentCharacter() {
        if (this.queue.length) {
            return this.queue[0];
        }else{
            return false;
        }
    }

}

