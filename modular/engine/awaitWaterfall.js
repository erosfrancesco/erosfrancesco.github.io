export default class AwaitWaterfall {
    constructor(steps, callback) {
        this.callback = callback;
        this.steps = steps;
        this.pointer = 0;
        this.update();
    }

    resolveStep(err, options, next) {
        this.steps[this.pointer]( params => { 
            this.pointer++;
            next(err, params); 
        }, options);
    }

    update(err, options) {
        
        if (err || (!this.steps[this.pointer]) ) {
            this.callback(err);
            return;
        }
        
        
        this.resolveStep(err, options, (e, params) => this.update(e, params) );
    }
}


/* test 


const a = new AwaitWaterfall([
    (next) => {
        console.log('step 1');
        next({hello: 'world'});
    },
    (next, options) => {
        console.log('options: ', options);
        next();
    }
], (err, res) => {
    console.log('returned ', res);
});

/**/
