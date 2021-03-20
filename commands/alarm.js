module.exports = {
    name: 'alarm',
    description: "Sets an alarm.",

    execute(message) {
        message.channel.send('Get up!');
    }
}