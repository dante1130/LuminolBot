const { MessageEmbed } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows the queue.'),
	name: 'queue',
	description: 'Shows the queue.',
	usage: '',
	category: 'Music',

	async execute(message, client) {
		const embed = new MessageEmbed();
		const server = client.servers.get(message.guild.id);

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

		await message.reply({ embeds: [embed] });
	},
};