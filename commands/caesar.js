const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'caesar',
	description: 'Caesar cipher, shifting alphabets given an offset.',
	usage: '<[encrypt/decrypt]> <[offset]> <text>',
	category: 'Ciphers',

	async execute(message) {
		const embed = new MessageEmbed();

		const args = message.content.split(' ').slice(1);

		if (args[0]) {
			if (args[0].startsWith('[') && (args[0].endsWith(']'))) {
				const oldMessage = args.slice(2).join(' ').toUpperCase();
				if (args[0].toLowerCase().replace(/[[\]]+/g, '') == 'encrypt' && (args[1].includes('[') && (args[1].includes(']')))) {
					let key = args[1].replace(/[[\]]+/g, '');
					if (!Number.isInteger(parseInt(key))) {
						key = 0;
					}
					embed.setTitle('Caesar Encrypt')
						.setColor('#00FFFF')
						.addField(`Offset: ${key}`, encrypt(oldMessage, key), true);
				}
				else if (args[0].toLowerCase().replace(/[[\]]+/g, '') == 'decrypt' && (args[1].includes('[') && (args[1].includes(']')))) {
					let key = args[1].replace(/[[\]]+/g, '');
					if (!Number.isInteger(parseInt(key))) {
						key = 0;
					}
					embed.setTitle('Caesar Decrypt')
						.setColor('#00FFFF')
						.addField(`Offset: ${key}`, decrypt(oldMessage, key), true);
				}
				else {
					embed.setTitle('Invalid arguments!')
						.setColor('#FF0000')
						.setDescription('e!caesar <[encrypt/decrypt]> <[offset]> <message>');
				}
			}

		}
		else {
			embed.setTitle('No arguments detected!')
				.setColor('#FF0000')
				.setDescription('e!caesar <[encrypt/decrypt]> <[offset]> <message>');
		}

		await message.reply({ embeds: [embed] });

		function encrypt(msg, key) {
			let newMessage = '';

			for (let i = 0; i < msg.length; i++) {
				if (!(msg[i] >= 'A' && msg[i] <= 'Z') && !(msg[i] >= 'a' && msg[i] <= 'z')) {
					newMessage = newMessage + msg[i];
				}
				else if (String.fromCharCode(msg.charCodeAt(i) + parseInt(key)).toUpperCase() > 'Z') {
					newMessage = newMessage + (String.fromCharCode(msg.charCodeAt(i) + parseInt(key) - 26));
				}
				else {
					newMessage = newMessage + String.fromCharCode(msg.charCodeAt(i) + parseInt(key));
				}
			}
			return newMessage;
		}

		function decrypt(msg, key) {
			let newMessage = '';

			for (let i = 0; i < msg.length; i++) {
				if (!(msg[i] >= 'A' && msg[i] <= 'Z') && !(msg[i] >= 'a' && msg[i] <= 'z')) {
					newMessage = newMessage + msg[i];
				}
				else if (String.fromCharCode(msg.charCodeAt(i) - parseInt(key)).toUpperCase() < 'A') {
					newMessage = newMessage + (String.fromCharCode(msg.charCodeAt(i) - parseInt(key) + 26));
				}
				else {
					newMessage = newMessage + String.fromCharCode(msg.charCodeAt(i) - parseInt(key));
				}
			}
			return newMessage;
		}
	},
};