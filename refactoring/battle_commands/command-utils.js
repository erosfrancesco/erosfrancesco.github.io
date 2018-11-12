const COMMANDNAMEMAP = {
    'FIGHT': (options) => { return new FightCommand(options) },
    'ITEMS': (options) => { return new ItemsCommand(options) }
};


BuildCharacterCommands = (scene, battle, commands) => {
    return commands.map(name => { return COMMANDNAMEMAP[name]({battle, scene}); });
}


export default {BuildCharacterCommands};