const { MessageEmbed } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	name: 'queue',
	description: 'Shows the queue.',
	usage: '',
	category: 'Music',

	execute(message, servers) {
		const embed = new MessageEmbed();
		const server = servers.get(message.guild.id);

		const connection = getVoiceConnection(message.guild.id);

		if (connection) {
			embed.setTitle(server.titles.length + ' left in queue.')
				.setColor('#00FFFF')
				.setDescription(server.titles.reduce((fullTitle, title) => fullTitle + title + '\n', ''));
		}
		else {
			embed.setTitle('Not in any voice channel!')
				.setColor('#FF0000')
				.setDescription('I\'m not in a voice channel, silly.');
		}

		message.channel.send({ embeds: [embed] });
	},
};