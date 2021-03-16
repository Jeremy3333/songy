const { CommandoClient } = require('discord.js-commando');
const { prefix, token } = require('./config.json');
const client = new CommandoClient({
    commandPrefix: prefix,
    owner: '189240713249161216'
});

client.once('ready', () => {
    console.log('Hello World');
})

client.login(token)