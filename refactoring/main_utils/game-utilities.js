export default class GameUtilities {
    constructor() {
        
    }


    static get PauseKey() {
        return 'keydown_P';
    }

    static get PauseFlag() {
        return GameUtilities._statusFlag;
    }
    static set PauseFlag(v) {
        GameUtilities._statusFlag = v;
    }


    static deepClone(o) {
        let _out = Array.isArray(o) ? [] : {};
        Object.keys(o).forEach(_key => {
            let v = o[_key];
            _out[_key] = (typeof v === "object") ? this.deepClone(v) : v;
        });
        return _out;
    }

    static PauseScene(scene) {
        console.log('paused');
        scene.pause();
        scene.scene.sound.sounds.forEach(sound => sound.pause());
    }

    static ResumeScene(scene) {
        console.log('resumed');
        scene.resume();
        scene.scene.sound.sounds.forEach(sound => sound.resume());
    }

    static TogglePause(game) {
        
        if (GameUtilities.PauseFlag) {
            GameUtilities.PauseFlag = false;
            game.scene.scenes.forEach((scene, index) => {
                if (index) GameUtilities.ResumeScene(scene.scene)
            });
            
        }else{
            GameUtilities.PauseFlag = true;
            game.scene.scenes.forEach((scene, index) => {
                if (index) GameUtilities.PauseScene(scene.scene);
            });
        }

    }

    static PauseEvent(game) {
        game.scene.scenes[0].input.keyboard.on(GameUtilities.PauseKey, () => GameUtilities.TogglePause(game) );
    }
    
}
