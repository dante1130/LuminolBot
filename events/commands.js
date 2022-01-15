const servers = new Map();
const prefix = 'e!';

module.exports = {
	name: 'messageCreate',
	execute(message, client) {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();

		switch (command) {
		case 'help':
			client.commands.get('help').execute(message, client.commands);
			break;

		case 'ping':
			client.commands.get('ping').execute(message);
			break;

		case 'ask':
			client.commands.get('ask').execute(message, args);
			break;

		case 'play':
			client.commands.get('play').execute(message, servers, args);
			break;

		case 'skip':
			client.commands.get('skip').execute(message, servers);
			break;

		case 'stop':
			client.commands.get('stop').execute(message, servers);
			break;

		case 'queue':
			client.commands.get('queue').execute(message, servers);
			break;

		case 'loop':
			client.commands.get('loop').execute(message, servers);
			break;

		case 'reddit':
			client.commands.get('reddit').execute(message, args);
			break;

		case 'wikipedia':
			client.commands.get('wikipedia').execute(message, args);
			break;

		case 'vigenere':
			client.commands.get('vigenere').execute(message, args);
			break;

		case 'caesar':
			client.commands.get('caesar').execute(message, args);
			break;

		case 'translate':
			client.commands.get('translate').execute(message, args);
			break;

		case 'covid':
			client.commands.get('covid').execute(message, args);
			break;

		case 'tth':
			client.commands.get('tth').execute(message, args);
			break;

		case 'openai':
			client.commands.get('openai').execute(message, args);
			break;

		case 'hitomezashi':
			client.commands.get('hitomezashi').execute(message, args);
			break;
		}

	},
};