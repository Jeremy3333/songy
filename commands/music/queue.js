const { Command, CommandoMessage } = require('discord.js-commando');

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            alias: ['q'],
            group: 'music',
            memberName: 'queue',
            description: 'affiche la file d\'attente. pour d\'autre page tapez le numero après la commande ex: `-/queue 2`',
            args: [
                {
                    key: 'page',
                    prompt: ':x: error',
                    default: 1,
                    type: 'integer'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message, { page }) {
        const server = message.client.server;

        if (!message.client.voice.connections.first()) {
            return message.say(":x: je doit etre dans un salon vocal pour utiliser cette commande")
        }
    }
}