import COMMANDS from '../battle-commands/index.js'

const { FightCommand } = COMMANDS;

const COMMANDNAMEMAP = {
	'FIGHT': options => { return new FightCommand(options) },
	//'ITEMS': options => { return new ItemsCommand(options) }
};

const BuildCharacterCommands = (battle, commands) => {
    return commands.map(name => { return COMMANDNAMEMAP[name]({battle, scene: battle.scene}); });
}

export default BuildCharacterCommands;