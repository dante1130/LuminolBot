const { MessageEmbed } = require("discord.js");
const wiki = require('wtf_wikipedia');

module.exports = {
    name: 'wikipedia',
    description: 'sends posts from wikpedia',

    execute(message, args) {
        const embed = new MessageEmbed();
        if (!args[0]) {
            embed.setTitle("No query detected!");
            embed.setColor('#FF0000');
            embed.setDescription("e!wikipedia <query>");
            message.channel.send(embed);
            return;
        }

        const searchTerm = args.join(' ');
        wiki.fetch(searchTerm).then((doc) => {
            message.channel.send(doc.url());
        }).catch(err => {
            console.error(err);
        })
    }
}