import Game from "./app.js";
import InputController from "./inputController.js";

Game.controller = InputController;

Game.addScene = (SceneInitializer, startScene = false, sceneData = {}) => {
	Game.scene.add(SceneInitializer.key, SceneInitializer, startScene, sceneData);
}
Game.startScene = (sceneKey, options = {}) => {
	Game.scene.start(sceneKey, options);
}

window.Game = Game;

export default Game;