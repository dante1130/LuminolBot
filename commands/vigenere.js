const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'vigenere',
	description: 'Vigenere Cipher, encrypts or decrypts a message given a key.',
	usage: '<[encrypt/decrypt]> <[key]> <message>',
	category: 'Ciphers',

	execute(message, args) {
		const embed = new MessageEmbed();

		if (args[0]) {
			if (args[0].startsWith('[') && (args[0].endsWith(']'))) {
				const oldMessage = args.slice(2).join(' ').toUpperCase();
				if (args[0].toLowerCase().replace(/[[\]]+/g, '') == 'encrypt' && (args[1].includes('[') && (args[1].includes(']')))) {
					const key = args[1].replace(/[[\]]+/g, '').toUpperCase();
					embed.setTitle('Vigenere Encrypt')
						.setColor('#00FFFF')
						.addField(`Key: ${key}`, encrypt(oldMessage, key), true);
				}
				else if (args[0].toLowerCase().replace(/[[\]]+/g, '') == 'decrypt' && (args[1].includes('[') && (args[1].includes(']')))) {
					const key = args[1].replace(/[[\]]+/g, '').toUpperCase();
					embed.setTitle('Vigenere Decrypt')
						.setColor('#00FFFF')
						.addField(`Key: ${key}`, decrypt(oldMessage, key), true);
				}
				else {
					embed.setTitle('Did not specify to encrypt or decrypt.')
						.setColor('#FF0000')
						.setDescription('e!vigenere <[encrypt/decrypt]> <[key]> <message>');
				}
			}
		}
		else {
			embed.setTitle('No arguments detected!')
				.setColor('#FF0000')
				.setDescription('e!vigenere <[encrypt/decrypt]> <[key]> <message>');
		}

		message.channel.send({ embeds: [embed] });

		function matchKeyToMessage(msg, key) {
			let newKey = '';

			for (let i = 0, j = 0; i < msg.length; i++, j++) {
				if (j < key.length) {
					newKey = newKey + key[j];
				}
				else {
					j = 0;
					newKey = newKey + key[j];
				}
			}
			return newKey.toUpperCase();
		}

		function encrypt(msg, key) {
			const matchingKey = matchKeyToMessage(msg, key);
			let newChar = '';
			let newMessage = '';

			for (let i = 0; i < msg.length; i++) {
				if (!(msg[i] >= 'A' && msg[i] <= 'Z')) {
					newMessage = newMessage + msg[i];
				}
				else {
					newChar = ((msg.charCodeAt(i) + matchingKey.charCodeAt(i)) % 26);
					newChar += 'A'.charCodeAt(0);

					newMessage = newMessage + String.fromCharCode(newChar);
				}
			}
			return newMessage;
		}

		function decrypt(msg, key) {
			const matchingKey = matchKeyToMessage(msg, key);
			let newChar = '';
			let newMessage = '';

			for (let i = 0; i < msg.length; i++) {
				if (!(msg[i] >= 'A' && msg[i] <= 'Z')) {
					newMessage = newMessage + msg[i];
				}
				else {
					newChar = ((msg.charCodeAt(i) - matchingKey.charCodeAt(i) + 26) % 26);
					newChar += 'A'.charCodeAt(0);

					newMessage = newMessage + String.fromCharCode(newChar);
				}
			}
			return newMessage;
		}
	},
};