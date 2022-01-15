const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	execute(message) {
		const embed = new MessageEmbed();

		message.content = message.content.toLowerCase();
		const forbiddenWords = ['tiing', 'diing'];
		for (const word of forbiddenWords) {
			if (message.content.includes(word)) {
				message.delete();
				embed.setTitle('Forbidden word detected!')
					.setColor('#FF0000')
					.setDescription(`Don't say ${word}! That's not very honourable of you.`);
				message.channel.send({ embeds: [embed] });
				break;
			}
		}
	},
};