const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

client.commands = new Collection();
client.servers = new Map();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(process.env.BOT_TOKEN);