const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ask',
    description: 'ask ema!',

    execute(message, args) {
        var question = args.join(' ');
        const responses =  ["as I see it, yes.", 
                            "ask again later.",
                            "better not tell you now.", 
                            "cannot predict now.",
                            "concentrate and ask again.", 
                            "don't count on it.",
                            "it is certain.", 
                            "it is decidedly so.",
                            "most likely.", 
                            "my reply is no.",
                            "my sources say no.", 
                            "outlook not so good.",
                            "outlook good.",
                            "reply hazy, try again.",
                            "signs point to yes.",
                            "very doubtful.",
                            "without a doubt.",
                            "yes.",
                            "yes - definitely.",
                            "you may rely on it."]
        const response = responses[Math.floor(Math.random() * responses.length)]
        const embed = new MessageEmbed()
            .setTitle(question)
            .setColor('#00FFFF')
            .attachFiles(['./images/DS.gif'])
            .setImage('attachment://DS.gif')
            .setDescription(`So, to scientically analyze the data available so far, ${response}`)
        message.channel.send(embed);
    }
}