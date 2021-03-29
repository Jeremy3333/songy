const { Command, CommandoMessage } = require('discord.js-commando');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            alias: ['j'],
            group: 'music',
            memberName: 'join',
            description: 'fait connecter le bot a ton salon vocal'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.say(':x: Tu dois être dans un salon vocal pour pouvoir utiliser cette commande')
        }

        if (message.client.voice.connections.first()) {
            return message.say(':x: Je suis deja connecter a un salon vocal.')
        }

        await voiceChannel.join();
        return message.say(`j'arrive sur \`${voiceChannel.name}\` :thumbsup:`);
    }
}