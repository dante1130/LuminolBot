const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping pong!'),
	name: 'ping',
	description: 'Ping pong!',
	usage: '',
	category: 'Fun',

	async execute(message) {
		await message.reply('pong!');
	},
};