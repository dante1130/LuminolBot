const { MessageEmbed } = require('discord.js');
const translate = require('translate-google');
const langs = require('translate-google/languages');

module.exports = {
	name: 'translate',
	description: 'Google Translate a message into another language.',
	usage: '<[language/language-list]> <message>',
	category: 'Google Translate',

	execute(message, args) {
		const embed = new MessageEmbed();
		let language = 'en';

		if (!args[0]) {
			embed.setTitle('No message detected!')
				.setColor('#FF0000')
				.setDescription('e!translate <message>');
			message.channel.send({ embeds: [embed] });
			return;
		}
		else if (args[0] == '[language-list]') {
			embed.setTitle('List of languages:')
				.setColor('#00FFFF')
				.setDescription('https://github.com/shikar/NODE_GOOGLE_TRANSLATE/blob/master/languages.js');
			message.channel.send({ embeds: [embed] });
			return;
		}
		else if (args[0].startsWith('[') && (args[0].endsWith(']'))) {
			if (args[0].toLowerCase().replace(/[[\]]+/g, '') in langs) {
				language = args[0].replace(/[[\]]+/g, '');
				args.shift();
			}
		}

		const msg = args.join(' ');

		translate(msg, { to: language }).then(res => {
			embed.setTitle(msg)
				.setColor('#00FFFF')
				.setDescription(res);
			message.channel.send({ embeds: [embed] });
		}).catch(err => {
			console.error(err);
		});
	},
};