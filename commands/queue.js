const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'queue',
	description: 'Shows the queue.',
	usage: '',
	category: 'Music',

	execute(message, servers) {
		const embed = new MessageEmbed();
		const server = servers[message.guild.id];

		if (message.guild.me.voice.connection) {
			if (message.member.voice.channel.id === message.guild.me.voice.channel.id) {
				embed.setTitle(server.titles.length + ' left in queue.')
					.setColor('#00FFFF')
					.setDescription(server.titles);
			}
			else {
				embed.setTitle('User not in same voice channel!')
					.setColor('#FF0000')
					.setDescription('You have to be in the same channel as me to make me leave.');
			}
		}
		else {
			embed.setTitle('Not in any voice channel!')
				.setColor('#FF0000')
				.setDescription('I\'m not in a voice channel, silly.');
		}

		message.channel.send({ embeds: [embed] });
	},
};