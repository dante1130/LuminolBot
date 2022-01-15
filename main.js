const { Client, Collection, MessageEmbed, Intents } = require('discord.js');

const bot = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

const fs = require('fs');

const { token } = require('./config.json');

bot.commands = new Collection();

const prefix = 'e!';
const embed = new MessageEmbed();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

const servers = new Map();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

// check if bot is ready
bot.once('ready', () => {
	console.log('LuminolBot is online!');
	bot.user.setActivity('Ace Attorney | e!help', { type: 'PLAYING' });
});

// commands
bot.on('messageCreate', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	switch (command) {
	case 'help':
		bot.commands.get('help').execute(message, bot.commands);
		break;

	case 'ping':
		bot.commands.get('ping').execute(message);
		break;

	case 'ask':
		bot.commands.get('ask').execute(message, args);
		break;

	case 'play':
		bot.commands.get('play').execute(message, servers, args);
		break;

	case 'skip':
		bot.commands.get('skip').execute(message, servers);
		break;

	case 'stop':
		bot.commands.get('stop').execute(message, servers);
		break;

	case 'queue':
		bot.commands.get('queue').execute(message, servers);
		break;

	case 'loop':
		bot.commands.get('loop').execute(message, servers);
		break;

	case 'reddit':
		bot.commands.get('reddit').execute(message, args);
		break;

	case 'wikipedia':
		bot.commands.get('wikipedia').execute(message, args);
		break;

	case 'vigenere':
		bot.commands.get('vigenere').execute(message, args);
		break;

	case 'caesar':
		bot.commands.get('caesar').execute(message, args);
		break;

	case 'translate':
		bot.commands.get('translate').execute(message, args);
		break;

	case 'covid':
		bot.commands.get('covid').execute(message, args);
		break;

	case 'tth':
		bot.commands.get('tth').execute(message, args);
		break;

	case 'openai':
		bot.commands.get('openai').execute(message, args);
		break;

	case 'hitomezashi':
		bot.commands.get('hitomezashi').execute(message, args);
		break;
	}
});

// @someone function
bot.on('messageCreate', message => {
	const args = message.content.split(/ +/);
	if (args.includes('@someone')) {
		const indexMention = args.indexOf('@someone');
		const channelMembers = [];

		message.guild.members.cache.forEach(member => channelMembers.push(member.user));

		const randomMember = channelMembers[Math.floor(Math.random() * channelMembers.length)];
		args.splice(indexMention, 1, `${randomMember}`);
		const newMessage = args.join(' ');
		message.channel.send(newMessage);
		message.delete();
	}
});

// forbids certain words
bot.on('messageCreate', message => {
	message.content = message.content.toLowerCase();
	const forbiddenWords = ['tiing', 'diing'];
	for (const word of forbiddenWords) {
		if (message.content.includes(word)) {
			message.delete();
			embed.setTitle('Forbidden word detected!')
				.setColor('#FF0000')
				.setDescription(`Don't say ${word}! That's not very honourable of you.`);
			message.channel.send({ embeds: [embed] });
			break;
		}
	}
});

// Kicks user whenever another specified user is in the same channel (INACTIVE)
/*
bot.on('voiceStateUpdate', (oldMember, newMember) => {
	const ivanID = '660674262574825482';
	const xiaoChenID = '780413321467789313';

	const ivan = newMember.guild.members.cache.get(ivanID);

	if (newMember.id === xiaoChenID && newMember.channelID === ivan.voice.channelID) {
		ivan.voice.setChannel(ivan.guild.afkChannelID);
	}
});
*/

bot.login(token);