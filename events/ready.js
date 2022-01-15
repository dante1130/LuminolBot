module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('LuminolBot is online!');
		client.user.setActivity('Ace Attorney | e!help', { type: 'PLAYING' });
	},
};