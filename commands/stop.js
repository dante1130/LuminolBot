const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    description: "Removes everything from queue and leaves the channel.",
    usage: "",
    category: "Music",

    execute (message, servers) {
        const embed = new MessageEmbed();
        let server = servers[message.guild.id];

        if (message.guild.me.voice.connection) {
            if (message.member.voice.channel.id === message.guild.me.voice.channel.id) {
                server.queue = [];
                server.titles = [];
                embed.setTitle("Hold it!")
                    .setColor('#00FFFF')
                    .setDescription('Ending the queue!');

                if(server.dispatcher) server.dispatcher.end();
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
        message.channel.send({ embeds: [embed] });
    }
}
