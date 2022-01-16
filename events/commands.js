const prefix = 'e!';

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const commandName = message.content.split(' ')[0].slice(prefix.length);

		const command = client.commands.get(commandName);

		if (!command) return;

		try {
			await command.execute(message, client);
		}
		catch (error) {
			console.error(error);
			await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

	},
};