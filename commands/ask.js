const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ask',
    description: 'ask ema!',

    execute(message, args) {
        var question = args.join(' ');
        const embed = new MessageEmbed()
            .setTitle(question)
            .setColor('#00FFFF');
            
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

        if (question.toUpperCase().includes("why are we still here".toUpperCase())) {
            embed.setDescription(`Just to suffer? Every night, I can feel my leg... And my arm... even my fingers... The body I've lost... the comrades I've lost... won't stop hurting... 
                                It's like they're all still there. You feel it, too, don't you? I'm gonna make them give back our past!`)
                .attachFiles(['./images/Sad.gif'])
                .setImage('attachment://Sad.gif');
        } else {
            const response = responses[Math.floor(Math.random() * responses.length)]
            embed.setDescription(`So, to scientically analyze the data available so far, ${response}`)
                .attachFiles(['./images/DS.gif'])
                .setImage('attachment://DS.gif');
        }
        message.channel.send(embed);
    }
};