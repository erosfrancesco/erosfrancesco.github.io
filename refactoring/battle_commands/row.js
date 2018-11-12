class RowFront extends _ATBCommandProto {
    constructor(options) {
        

        super({label: 'FRONT'});

        this.action = (options) => {

            let {player, battle} = options;
            
            player.Action = new RowChangeAction({executor: player, battle});

            // build player action
            Animator.addCharacterAction(player);
            Animator.setPlayerActionTargets([player]);
        };
    }
}

class RowRear extends _ATBCommandProto {
    constructor(options) {
        

        super({label: 'REAR'});

        this.action = (options) => {

            let {player, battle} = options;
            
            player.Action = new RowChangeAction({executor: player, battle});

            // build player action
            Animator.addCharacterAction(player);
            Animator.setPlayerActionTargets([player]);
        };
    }
}




class RowChangeAction extends _ATBActionProto {
    constructor(options) {
        super(options);
    }

    resolve(callback) { 
        
        console.log(this.executor.Commands);

        this.executor.backRow = !this.executor.backRow;
        if (this.executor.backRow) {
            // change player command to frontrow
        }else{
            // change player command to backrow
        }   

        callback();
    }
}

