const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'caesar',
    description: "Caesar cipher",

    execute(message, args) {
        const embed = new MessageEmbed();

        if (args[0]) {
            if (args[0].includes('[') && (args[0].includes(']'))) {
                const oldMessage = args.slice(2).join(' ').toUpperCase();
                if (args[0].toLowerCase().replace(/[\[\]]+/g, '') == 'encrypt' && (args[1].includes('[') && (args[1].includes(']')))) {
                    let key = args[1].replace(/[\[\]]+/g, '');
                    if (!Number.isInteger(parseInt(key))) {
                        key = 0;
                    }
                    embed.setTitle("Caesar Encrypt")
                        .setColor('#00FFFF')
                        .addField(`Offset: ${key}`, encrypt(oldMessage, key), true);
                } else if (args[0].toLowerCase().replace(/[\[\]]+/g, '') == 'decrypt' && (args[1].includes('[') && (args[1].includes(']')))) {
                    let key = args[1].replace(/[\[\]]+/g, '');
                    if (!Number.isInteger(parseInt(key))) {
                        key = 0;
                    }
                    embed.setTitle("Caesar Decrypt")
                        .setColor('#00FFFF')
                        .addField(`Offset: ${key}`, decrypt(oldMessage, key), true);
                } else {
                    embed.setTitle("Invalid arguments!")
                        .setColor('#FF0000')
                        .setDescription("e!caesar <[encrypt/decrypt]> <[offset]> <message>");
                }
            }
            
        } else {
            embed.setTitle("No arguments detected!")
                .setColor('#FF0000')
                .setDescription("e!caesar <[encrypt/decrypt]> <[offset]> <message>");
        }

        message.channel.send(embed);

        function encrypt(message, key) {
            let newMessage = '';

            for (let i = 0; i < message.length; i++) {
                if ( !(message[i] >= "A" && message[i] <= "Z") && !(message[i] >= "a" && message[i] <= "z")) {
                    newMessage = newMessage + message[i];
                } else {
                    if (String.fromCharCode(message.charCodeAt(i) + parseInt(key)).toUpperCase() > "Z") {
                        newMessage = newMessage + (String.fromCharCode(message.charCodeAt(i) + parseInt(key) - 26));
                    } else {
                        newMessage = newMessage + String.fromCharCode(message.charCodeAt(i) + parseInt(key));
                    }
                }
            }
            return newMessage;
        }

        function decrypt(message, key) {
            let newMessage = '';

            for (let i = 0; i < message.length; i++) {
                if ( !(message[i] >= "A" && message[i] <= "Z") && !(message[i] >= "a" && message[i] <= "z")) {
                    newMessage = newMessage + message[i];
                } else {
                    if (String.fromCharCode(message.charCodeAt(i) - parseInt(key)).toUpperCase() < "A") {
                        newMessage = newMessage + (String.fromCharCode(message.charCodeAt(i) - parseInt(key) + 26));
                    } else {
                        newMessage = newMessage + String.fromCharCode(message.charCodeAt(i) - parseInt(key));
                    }
                }
            }
            return newMessage;
        }
    }
}