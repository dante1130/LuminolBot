const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides list of commands and its use.'),
	name: 'help',
	description: 'Provides list of commands and its use.',
	usage: '',
	category: 'Help',

	async execute(interaction, client) {
		const embed = new MessageEmbed()
			.setTitle('List of commands')
			.setColor('#00FFFF')
			.addFields(
				{
					name: 'About',
					value: 'Link to Github repository: https://github.com/dante1130/LuminolBot',
					inline: false,
				},
				{
					name: 'Misc',
					value: '@someone    Pings a random person in the server, can be used in between a message.',
					inline: false,
				},
			);

		client.commands.each(command => {
			const index = embed.fields.findIndex(field => field.name === command.category);

			if (index === -1) {
				embed.addField(command.category, `e!${command.name} ${command.usage} ${command.description}\n`, false);
			}
			else {
				embed.fields[index].value += `e!${command.name} ${command.usage} ${command.description}\n`;
			}
		});

		await interaction.reply({ embeds: [embed] });
	},
};