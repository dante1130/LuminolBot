const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    description: "stops the queue",

    execute (message, servers) {
        const embed = new MessageEmbed();
        var server = servers[message.guild.id];

        if (message.guild.me.voice.connection) {
            if (message.member.voice.channel.id === message.guild.me.voice.channel.id) {
                server.queue = [];
                server.titles = [];
                embed.setTitle("Hold it!");
                embed.setColor('#00FFFF');
                embed.setDescription('Ending the queue!');

                if(server.dispatcher) server.dispatcher.end();
            } else {
                embed.setTitle("User not in same voice channel!");
                embed.setColor('#FF0000');
                embed.setDescription("You have to be in the same channel as me to make me leave.");
            }
        } else {
            embed.setTitle("Not in any voice channel!");
            embed.setColor('#FF0000');
            embed.setDescription("I'm not in a voice channel, silly.");
        }
        message.channel.send(embed);
    }
}
