const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage } = require('discord.js-commando');
const ytdl = require('ytdl-core-discord')

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            alias: ['pa'],
            group: 'music',
            memberName: 'pause',
            description: 'Met en pause la musique actuellement jouée.'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message) {
        if (!message.member.voice.channel) {
            return message.say(':x: Tu dois être dans un salon vocal pour pouvoir utiliser cette commande')
        }
    }
}