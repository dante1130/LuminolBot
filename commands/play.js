const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const youtubeSearch = require('youtube-search');
require('dotenv').config({path: '../'});


module.exports = {
    name: 'play',
    description: "plays youtube link!",
    
    execute (message, servers, args) {
        const embed = new MessageEmbed();

        async function addPlaylistToQueue() {
            var server = servers[message.guild.id];

            const playlist = await ytpl(args[0]);

            playlist.items.forEach(item => {
                server.queue.push(item.shortUrl);
                server.titles.push(item.title);
            });
        }

        const addToQueue = () => {
            return new Promise((resolve, reject) => {
                var server = servers[message.guild.id];

                var opts = {
                    maxResults: 1,
                    key: process.env.YOUTUBE_API_KEY
                };

                youtubeSearch(args.join(' '), opts, (err, results) => {
                    if (err) {
                        embed.setTitle("Your search did not find any video!");
                        embed.setColor('#FF0000');
                        message.channel.send(embed);
                        reject();
                    }

                    var result = results[0];

                    if (result.kind === 'youtube#playlist' || args[0].includes('https://www.youtube.com/playlist?list=')) {
                        addPlaylistToQueue();
                        resolve();
                    } else {
                        server.queue.push(result.link);
                        server.titles.push(result.title);
                        resolve();
                    }
                });
                
            });
        }

        async function connect() {
            await addToQueue();
            if (!message.guild.me.voice.connection) message.member.voice.channel.join().then((connection) => {
                play(connection);
            });
        }

        const play = (connection) => {
            var server = servers[message.guild.id];

            server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));

            if (server.queue[0]) {
                embed.setTitle(`Now playing: ${server.titles[0]}`)
                    .setColor('#00FFFF');
                message.channel.send(embed);
            }

            server.dispatcher.on("finish", () => {
                if (!server.loop && !server.skip) {
                    server.queue.shift();
                    server.titles.shift();
                } else {
                    server.skip = false; 
                }

                if (server.queue[0]) {
                    play(connection);
                } else {
                    embed.setTitle("Nothing left in queue, leaving channel!")
                        .setColor('#00FFFF');
                    message.channel.send(embed);
                    connection.disconnect();
                }
            });
        } 

        // No arguments
        if (!args[0]) {
            embed.setTitle("No URL in argument!")
                .setColor('#FF0000')
                .setDescription('e!play <URL>');
            message.channel.send(embed);
            return;
        }
        
        // User not in voice channel
        if (!message.member.voice.channel) {
            embed.setTitle("Member not in voice channel!")
                .setColor('#FF0000')
                .setDescription('Please join a voice channel and try again.');
            message.channel.send(embed);
            return;
        }

        // Initialization
        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: [],
            titles: [],
            loop: false,
            skip: false
        };

        connect();
    }
};