const { MessageEmbed } = require("discord.js");
const translate = require('translate-google');
const langs = require("translate-google/languages");

module.exports = {
    name: 'translate',
    description: 'google translate',

    execute(message, args) {
        const embed = new MessageEmbed()
        var language = 'en';

        if (!args[0]) {
            embed.setTitle("No message detected!");
            embed.setColor('#FF0000');
            embed.setDescription("e!translate <message>");
            message.channel.send(embed);
            return;
        } else if (args[0] == '[language-list]') {
            embed.setTitle("List of languages:");
            embed.setColor('#00FFFF');
            embed.setDescription('https://github.com/shikar/NODE_GOOGLE_TRANSLATE/blob/master/languages.js');
            message.channel.send(embed);
            return;
        } else if (args[0].includes('[') && (args[0].includes(']'))) {
            if (args[0].toLowerCase().replace(/[\[\]]+/g, '') in langs) {
                language = args[0].replace(/[\[\]]+/g, '');
                args.shift();
            }
        }

        const msg = args.join(' ');
            translate(msg, {to: language}).then(res => {
                embed.setTitle(msg);
                embed.setColor('#00FFFF');
                embed.setDescription(res);
                message.channel.send(embed);
            }).catch(err => {
                console.error(err);
            })
        
    }
}