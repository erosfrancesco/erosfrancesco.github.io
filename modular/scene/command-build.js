import COMMANDS from '../battle-commands/index.js'

let { FightCommand } = COMMANDS;

const COMMANDNAMEMAP = {
	'FIGHT': options => { return new FightCommand(options) },
	//'ITEMS': options => { return new ItemsCommand(options) }
};

let BuildCharacterCommands = (scene, battle, commands) => {
    return commands.map(name => { return COMMANDNAMEMAP[name]({battle, scene}); });
}

export default BuildCharacterCommands;