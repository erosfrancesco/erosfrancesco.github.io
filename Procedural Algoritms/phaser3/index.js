import Game from "./app.js";
import InputController from "./inputControllerScene.js";


Game.addScene = (SceneInitializer, startScene = false, sceneData = {}) => {
	Game.scene.add(SceneInitializer.key, SceneInitializer, startScene, sceneData);
}
Game.startScene = (sceneKey, options = {}) => {
	options.resources = resources;
	Game.scene.start(sceneKey, options);
}
Game.addScene(InputController, true);

window.Game = Game;

export default Game;