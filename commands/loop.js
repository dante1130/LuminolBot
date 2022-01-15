const { MessageEmbed } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	name: 'loop',
	description: 'Loops the current song.',
	usage: '',
	category: 'Music',

	execute(message, servers) {
		const embed = new MessageEmbed();
		const server = servers.get(message.guild.id);

		const connection = getVoiceConnection(message.guild.id);

		if (connection) {
			server.loop = !server.loop;
			embed.setTitle('Hold it!')
				.setColor('#00FFFF')
				.setDescription(server.loop ? 'Looping the current song!' : 'Stopped looping the current song!');
		}
		else {
			embed.setTitle('Not in any voice channel!')
				.setColor('#FF0000')
				.setDescription('I\'m not in a voice channel, silly.');
		}
		message.channel.send({ embeds: [embed] });
	},
};