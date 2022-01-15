module.exports = {
	name: 'ping',
	description: 'Ping pong!',
	usage: '',
	category: 'Fun',

	execute(message) {
		message.channel.send('pong!');
	},
};