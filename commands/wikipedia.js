const { MessageEmbed } = require("discord.js");
const wiki = require('wtf_wikipedia');

module.exports = {
    name: 'wikipedia',
    description: 'sends posts from wikpedia',

    execute(message, args) {
        const embed = new MessageEmbed();
        if (!args[0]) {
            embed.setTitle("No query detected!")
                .setColor('#FF0000')
                .setDescription("e!wikipedia <query>");
            message.channel.send({ embeds: [embed] });
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