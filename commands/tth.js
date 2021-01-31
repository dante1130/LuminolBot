const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tth',
    description: "Replaces t with th and th with t.",

    execute(message, args) {
        const embed = new MessageEmbed();
        var newMessage = "";
        args = args.join(' ');

        for (let i = 0; i < args.length; i++) {
            if (args[i] === "t") {
                if (args[i+1] === "h") {
                    newMessage += "t";
                    i++;
                } else {
                    newMessage += "th";
                }
            } else {
                newMessage += args[i];
            }
            console.log(newMessage);
        }
        
        embed.setTitle(args)
            .setDescription(newMessage)
            .setColor('#00FFFF');
        message.channel.send(embed);
    }
}