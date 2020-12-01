const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'loop',
    description: "loops the current song",

    execute (message, servers) {
        const embed = new MessageEmbed();
        var server = servers[message.guild.id];

        if (message.guild.me.voice.connection) {
            if (message.member.voice.channel.id === message.guild.me.voice.channel.id) {
                if (!server.loop) {
                    server.loop = true;
                    embed.setTitle("Looping!")
                        .setColor('#00FFFF');
                } else {
                    server.loop = false;
                    embed.setTitle("Stopped looping!")
                        .setColor('#00FFFF');
                }
            } else {
                embed.setTitle("User not in same voice channel!")
                    .setColor('#FF0000')
                    .setDescription("You have to be in the same channel as me to make me leave.");
            }
        } else {
            embed.setTitle("Not in any voice channel!")
                .setColor('#FF0000')
                .setDescription("I'm not in a voice channel, silly.");
        }
        message.channel.send(embed);
    }
}