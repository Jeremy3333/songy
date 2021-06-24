const { CommandoClient } = require('discord.js-commando');
const { prefix, token, owner } = require('./config.json');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owner
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'Music')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.server = {
    queue: [],
    currentVideo: { title: "", url: "" },
    dispatcher: null
}

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
});

client.on('error', (error) => console.error(error));

client.login(token)