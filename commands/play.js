const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const yts = require('yt-search');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	getVoiceConnection,
} = require('@discordjs/voice');

module.exports = {
	name: 'play',
	description: 'Plays a YouTube video or playlist.',
	usage: '<link/title>',
	category: 'Music',

	async execute(message, client) {
		const embed = new MessageEmbed();

		const args = message.content.split(' ').slice(1);

		const addPlaylistToQueue = async () => {
			const server = client.servers.get(message.guild.id);

			const playlist = await ytpl(args[0]);

			playlist.items.forEach(item => {
				server.queue.push(item.shortUrl);
				server.titles.push(item.title);
			});
		};

		const addToQueue = async () => {
			const server = client.servers.get(message.guild.id);

			const results = await yts(args.join(' '));

			if (results.all.length === 0) {
				embed.setTitle('Your search did not find any video!');
				embed.setColor('#FF0000');
				await message.reply({ embeds: [embed] });
				return;
			}

			const result = results.all[0];

			embed.setTitle(`Added to queue: ${result.title}`)
				.setColor('#00FFFF');

			if (result.type === 'list') {
				await addPlaylistToQueue();
			}
			else {
				server.queue.push(result.url);
				server.titles.push(result.title);
			}

			await message.reply({ embeds: [embed] });
		};


		const connect = async () => {
			await addToQueue();

			let connection = getVoiceConnection(message.guild.id);

			if (!connection) {
				connection = joinVoiceChannel({
					channelId: message.member.voice.channel.id,
					guildId: message.guild.id,
					adapterCreator: message.guild.voiceAdapterCreator,
				});

				play(connection);
			}
		};

		const play = (connection) => {
			const server = client.servers.get(message.guild.id);

			const stream = ytdl(server.queue[0], {
				filter: 'audioonly',
				highWaterMark: 1 << 25,
			});

			const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

			const player = createAudioPlayer();

			player.play(resource);

			server.subscription = connection.subscribe(player);

			player.on('error', (error) => {
				console.log(error);
			});

			player.on(AudioPlayerStatus.Idle, () => {
				if (!server.loop) {
					server.queue.shift();
					server.titles.shift();
				}

				if (server.queue[0]) {
					play(connection);
				}
				else {
					connection.destroy();
				}
			});

			player.on(AudioPlayerStatus.Error, () => connection.destroy());

			if (server.queue[0]) {
				embed.setTitle(`Now playing: ${server.titles[0]}`)
					.setColor('#00FFFF');
				message.reply({ embeds: [embed] });
			}
		};

		// Initialization
		if (!client.servers.has(message.guild.id)) {
			client.servers.set(message.guild.id, {
				queue: [],
				titles: [],
				subscription: null,
				loop: false,
			});
		}

		// No arguments
		if (!args[0] && !client.servers[message.guild.id].skip) {
			embed.setTitle('No URL in argument!')
				.setColor('#FF0000')
				.setDescription('e!play <URL>');
			await message.reply({ embeds: [embed] });
			return;
		}

		// User not in voice channel
		if (!message.member.voice.channel) {
			embed.setTitle('Member not in voice channel!')
				.setColor('#FF0000')
				.setDescription('Please join a voice channel and try again.');
			await message.reply({ embeds: [embed] });
			return;
		}

		connect();
	},
};