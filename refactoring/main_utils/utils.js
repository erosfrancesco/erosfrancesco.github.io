const __PAUSEEVENTKEYBOARDKEY = 'keydown_P';


/**/
function deepClone(o){
	
	let _out = Array.isArray(o) ? [] : {};
	
	Object.keys(o).forEach(_key => {
		let v = o[_key];
		_out[_key] = (typeof v === "object") ? deepClone(v) : v;
	});
	
	return _out;
}
/**/


function PauseScene(scene) {
    scene.pause();
    scene.scene.sound.sounds.forEach(sound => sound.pause());
}
function ResumeScene(scene) {
    scene.resume();
    scene.scene.sound.sounds.forEach(sound => sound.resume());
}

function TogglePause(scene) {
    if (scene.Paused) {
        scene.Paused = false;
        ResumeScene(scene);
    }else{
        scene.Paused = true;
        PauseScene(scene);
    }
}


export default {deepClone, TogglePause};