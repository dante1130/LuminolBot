const { MessageEmbed } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Removes everything from queue and leaves the channel.'),
	name: 'stop',
	description: 'Removes everything from queue and leaves the channel.',
	usage: '',
	category: 'Music',

	async execute(message, client) {
		const embed = new MessageEmbed();
		const server = client.servers.get(message.guild.id);

		const connection = getVoiceConnection(message.guild.id);

		if (connection) {
			server.queue = [];
			server.titles = [];
			embed.setTitle('Hold it!')
				.setColor('#00FFFF')
				.setDescription('Ending the queue!');

			connection.destroy();
		}
		else {
			embed.setTitle('Not in any voice channel!')
				.setColor('#FF0000')
				.setDescription('I\'m not in a voice channel, silly.');
		}
		await message.reply({ embeds: [embed] });
	},
};
