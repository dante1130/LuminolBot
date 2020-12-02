const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const youtube = require('youtube-metadata-from-url');
const youtubeSearch = require('youtube-search');
require('dotenv').config({path: '../'});


module.exports = {
    name: 'play',
    description: "plays youtube link!",
    
    execute (message, servers, args) {

        function play(connection, message) {
            var server = servers[message.guild.id];
    
            server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));

            if (server.queue[0]) {
                embed.setTitle(`Now playing: ${server.titles[0]}`)
                    .setColor('#00FFFF');
                message.channel.send(embed);
            }

            server.dispatcher.on("finish", function() {
                if (!server.loop && !server.skip) {
                    server.queue.shift();
                    server.titles.shift();
                } else {
                    server.skip = false; 
                }

                if (server.queue[0]) {
                    play(connection, message);
                } else {
                    embed.setTitle("Nothing left in queue, leaving channel!")
                        .setColor('#00FFFF');
                    message.channel.send(embed);
                    connection.disconnect();
                }
            });
        } 

        const embed = new MessageEmbed();

        if (!args[0]) {
            embed.setTitle("No URL in argument!")
                .setColor('#FF0000')
                .setDescription('e!play <URL>');
            message.channel.send(embed);
            return;
        }
        

        if (!message.member.voice.channel) {
            embed.setTitle("Member not in voice channel!")
                .setColor('#FF0000')
                .setDescription('Please join a voice channel and try again.');
            message.channel.send(embed);
            return;
        }

        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: [],
            titles: [],
            loop: false,
            skip: false
        };
        
        var server = servers[message.guild.id];

        if (!args[0].includes("https://www.youtube.com/watch?v=") && !args[0].includes("https://youtu.be/")) { 
            var opts = {
                maxResults: 1,
                key: process.env.YOUTUBE_API_KEY
            };
        
            youtubeSearch(args.join(' '), opts, function(err, results) {
                if (err) {
                    embed.setTitle("Your search did not find any video!");
                    embed.setColor('#FF0000');
                    message.channel.send(embed);
                    return;
                } 
                server.queue.push(results[0].link);
                server.titles.push(results[0].title);
            });
        } else {
            server.queue.push(args[0]);
            youtube.metadata(args[0]).then(function(json) {
                server.titles.push(json.title);
            }, function(err){
                console.log(err);
            });
        }

        if (!message.guild.me.voice.connection) message.member.voice.channel.join().then(function(connection) {
            play(connection, message);
        });
    }
};