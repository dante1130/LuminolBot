const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'provides list of commands and its use',

    execute(message) {
        const embed = new MessageEmbed()
            .setTitle('List of commands')
            .setColor('#00FFFF')
            .addFields(
                {
                    name: 'About',
                    value: 'Link to Github repository: https://github.com/dante1130/LuminolBot',
                    inline: false
                },
                {
                    name: 'Fun',
                    value: `e!ping              Ping pong!
                            e!ask <question>    Ask me anything and I will answer with science!
                            e!tth <message>     Replaces t with th and th with t.`,
                    inline: false
                },
                {
                    name: 'Fetch posts',
                    value: `e!reddit <subreddit>    Returns a hot post from a subreddit.
                            e!wikipedia <query>     Returns a Wikipedia page.
                            e!covid <country>       Returns COVID19 statistics based on country.`,
                    inline: false
                },
                {
                    name: 'Google Translate',
                    value: `e!translate <message>                   Translate a message into the default language (English)
                            e!translate <[language]> {message}      Translate a message into a specific language.
                            e!translate <[language-list]>           Shows the link to the list of languages available.`,
                    inline: false
                },
                {
                    name: 'Ciphers',
                    value: `e!caesar <[encrypt]> <[key]> <message>      Encrypts a message in Caesar Cipher
                            e!caesar <[decrypt]> <[key]> <message>      Decrypts a message in Caesar Cipher
                            e!vigenere <[encrypt]> <[key]> <message>    Encrypts a message in Vigenere Cipher
                            e!vigenere <[decrypt]> <[key]> <message>    Decrypts a message in Vigenere Cipher`,
                    inline: false
                },
                {
                    name: 'Music',
                    value: `e!play <URL>    Plays a YouTube link.
                            e!skip          Skip a song in the queue.
                            e!stop          Ends the queue.
                            e!queue         Shows the queue.
                            e!loop          Loops the current track.`,
                    inline: false
                },
                {
                    name: 'Misc',
                    value: `@someone    Pings a random person in the server, can be used in between a message.`,
                    inline: false
                }
            )
        message.channel.send(embed);
    }
}