module.exports = {
    name: 'ping',
    description: "Ping pong!",

    execute(message) {
        message.channel.send('pong!');
    }
}