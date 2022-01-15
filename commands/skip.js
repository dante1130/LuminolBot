const { MessageEmbed } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	name: 'skip',
	description: 'Skips the current song in the queue.',
	usage: '',
	category: 'Music',

	execute(message, servers) {
		const embed = new MessageEmbed();
		const server = servers.get(message.guild.id);

		const connection = getVoiceConnection(message.guild.id);

		if (connection) {
			embed.setTitle('Hold it!');
			embed.setColor('#00FFFF');
			embed.setDescription('Skipping the queue!');

			server.subscription.player.stop();
		}
		else {
			embed.setTitle('Not in any voice channel!');
			embed.setColor('#FF0000');
			embed.setDescription('I\'m not in a voice channel, silly.');
		}
		message.channel.send({ embeds: [embed] });
	},
};
