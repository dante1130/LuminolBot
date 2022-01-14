module.exports = {
	name: 'tth',
	description: 'Replaces t with th and th with t.',
	usage: '<message>',
	category: 'Fun',

	execute(message, args) {
		let newMessage = '';
		args = args.join(' ');

		for (let i = 0; i < args.length; ++i) {
			if (args[i].toLowerCase() === 't') {
				if (args[i + 1] === 'h') {
					newMessage += args[i];
					++i;
				}
				else {
					newMessage += args[i] + 'h';
				}
			}
			else {
				newMessage += args[i];
			}
		}

		message.channel.send(newMessage);
	},
};