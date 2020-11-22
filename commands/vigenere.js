const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'vigenere',
    description: "Vigenere cipher",

    execute(message, args) {
        const embed = new MessageEmbed();

        if (args[0]) {
            if (args[0].includes('[') && (args[0].includes(']'))) {
                const oldMessage = args.slice(2).join(' ').toUpperCase();
                if (args[0].toLowerCase().replace(/[\[\]]+/g, '') == 'encrypt' && (args[1].includes('[') && (args[1].includes(']')))) {
                    const key = args[1].replace(/[\[\]]+/g, '').toUpperCase();
                    embed.setTitle("Vigenere Encrypt");
                    embed.setColor('#00FFFF');
                    embed.addField(`Key: ${key}`, encrypt(oldMessage, key), true);
                } else if (args[0].toLowerCase().replace(/[\[\]]+/g, '') == 'decrypt' && (args[1].includes('[') && (args[1].includes(']')))) {
                    const key = args[1].replace(/[\[\]]+/g, '').toUpperCase();
                    embed.setTitle("Vigenere Decrypt");
                    embed.setColor('#00FFFF');
                    embed.addField(`Key: ${key}`, decrypt(oldMessage, key), true);
                } else {
                    embed.setTitle("Did not specify to encrypt or decrypt.");
                    embed.setColor('#FF0000');
                    embed.setDescription("e!vigenere <[encrypt/decrypt]> <[key]> <message>");
                }
            }
            
        } else {
            embed.setTitle("No arguments detected!");
            embed.setColor('#FF0000');
            embed.setDescription("e!vigenere <[encrypt/decrypt]> <[key]> <message>");
        }

        message.channel.send(embed);

        function matchKeyToMessage(message, key) {
            var newKey = ''

            for (let i = 0, j = 0; i < message.length; i++, j++) {
                if (j < key.length) {
                    newKey = newKey + key[j]
                } else {
                    j = 0;
                    newKey = newKey + key[j]
                }
            }
            return newKey.toUpperCase();
        }

        function encrypt(message, key) {
            const matchingKey = matchKeyToMessage(message, key);
            var newChar = '';
            var newMessage = '';

            for (let i = 0; i < message.length; i++) {
                if (!(message[i] >= "A" && message[i] <= "Z")) {
                    newMessage = newMessage + message[i];
                } else {
                    newChar = ( (message.charCodeAt(i) + matchingKey.charCodeAt(i)) % 26);
                    newChar += 'A'.charCodeAt(0);

                    newMessage = newMessage + String.fromCharCode(newChar);
                }
            }
            return newMessage;
        }

        function decrypt(message, key) {
            const matchingKey = matchKeyToMessage(message, key);
            var newChar = '';
            var newMessage = '';

            for (let i = 0; i < message.length; i++) {
                if (!(message[i] >= "A" && message[i] <= "Z")) {
                    newMessage = newMessage + message[i];
                } else {
                    newChar = ( (message.charCodeAt(i) - matchingKey.charCodeAt(i) + 26) % 26);
                    newChar += 'A'.charCodeAt(0);

                    newMessage = newMessage + String.fromCharCode(newChar);
                }
            }
            return newMessage;
        }
    }
}