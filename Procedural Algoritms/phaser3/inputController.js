export default function GameInputController(scene) {
    const cursors = scene.input.keyboard.createCursorKeys();
    const primary = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    const secondary = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    return Object.assign({}, cursors, {primary, secondary});
};
