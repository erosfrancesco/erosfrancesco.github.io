
class ItemsCommand extends _ATBCommandProto {
    constructor(options) {
        

        super({label: 'ITEMS'});

        this.action = (options) => {

            let {player, battle} = options;
            let {Players, Enemies} = battle;

            // open item menu

            // select target
            //let target = Players.find((p, indx) => { return indx === 0; });

            // calc damage
            //target.damage = 157;
        };
    }
}
