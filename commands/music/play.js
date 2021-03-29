const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage } = require('discord.js-commando');
const ytdl = require('ytdl-core-discord')

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            alias: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'Lit une musique depuis YouTube ou reprend la vidéo en pause',
            args: [
                {
                    key: 'query',
                    type: 'string',
                    prompt: ':x: error',
                    default: false
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message, { query }) {
        const server = message.client.server;
        if (!message.member.voice.channel) {
            return message.say(':x: Tu dois être dans un salon vocal pour pouvoir utiliser cette commande')
        }
        if (query != false) {
            await message.member.voice.channel.join().then((connection) => {
                if (server.currentVideo.url != "") {
                    server.queue.push({ title: "", url: query });
                    return message.say("Ajouter à la file d'attente");
                } else {
                    server.currentVideo = {
                        title: "",
                        url: query
                    };
                    this.runVideo(message, connection, query);
                }
            });
        } else {
            if (!message.client.voice.connections.first() || !server.dispatcher) {
                return message.say(':x: je doit avoir une video en argument ou qu\'il y ai une musique en pause.')
            }
            if (server.dispatcher) {
                server.dispatcher.resume();
                return message.say('reprend la musique :notes: ')
            }
        }
    }

    /**
     * 
     * @param {CommandoMessage} message
     * @param {VoiceConnection} connection
     * @param {*} video 
     */
    async runVideo(message, connection, video) {
        const server = message.client.server;
        const dispatcher = connection.play(await ytdl(video, { filter: 'audioonly' }), { type: 'opus' })
        message.say("en train de jouer :notes:")

        server.queue.shift();
        server.dispatcher = dispatcher

        dispatcher.on('finish', () => {
            if (server.queue[0]) {
                server.currentVideo = server.queue[0];
                return this.runVideo(message, connection, server.currentVideo.url);
            }
        });
    }
}