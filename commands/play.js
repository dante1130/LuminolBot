const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const youtubeSearch = require('youtube-search');
const { youtubeApiKey } = require('../config.json');
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
	description: 'Plays a YouTube link.',
	usage: '<link/title>',
	category: 'Music',

	execute(message, servers, args) {
		const embed = new MessageEmbed();

		const addPlaylistToQueue = async () => {
			const server = servers.get(message.guild.id);

			const playlist = await ytpl(args[0]);

			playlist.items.forEach(item => {
				server.queue.push(item.shortUrl);
				server.titles.push(item.title);
			});
		};

		const addToQueue = () => {
			return new Promise((resolve, reject) => {
				const server = servers.get(message.guild.id);

				const opts = {
					maxResults: 1,
					key: youtubeApiKey,
				};

				youtubeSearch(args.join(' '), opts, (err, results) => {
					if (err) {
						embed.setTitle('Your search did not find any video!');
						embed.setColor('#FF0000');
						message.channel.send({ embeds: [embed] });
						reject();
					}

					const result = results[0];

					embed.setTitle(`Added to queue: ${result.title}`)
						.setColor('#00FFFF');

					if (result.kind === 'youtube#playlist' || args[0].includes('https://www.youtube.com/playlist?list=')) {
						addPlaylistToQueue();
					}
					else {
						server.queue.push(result.link);
						server.titles.push(result.title);
					}

					message.channel.send({ embeds: [embed] });

					resolve();
				});
			});
		};

		const connect = async () => {
			try {
				await addToQueue();
			}
			catch (error) {
				console.log(error);
			}

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
			const server = servers.get(message.guild.id);

			const stream = ytdl(server.queue[0], { filter: 'audioonly' });

			const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

			const player = createAudioPlayer();

			player.play(resource);

			server.subscription = connection.subscribe(player);

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
				message.channel.send({ embeds: [embed] });
			}
		};

		// Initialization
		if (!servers.has(message.guild.id)) {
			servers.set(message.guild.id, {
				queue: [],
				titles: [],
				subscription: null,
				loop: false,
			});
		}

		// No arguments
		if (!args[0] && !servers[message.guild.id].skip) {
			embed.setTitle('No URL in argument!')
				.setColor('#FF0000')
				.setDescription('e!play <URL>');
			message.channel.send({ embeds: [embed] });
			return;
		}

		// User not in voice channel
		if (!message.member.voice.channel) {
			embed.setTitle('Member not in voice channel!')
				.setColor('#FF0000')
				.setDescription('Please join a voice channel and try again.');
			message.channel.send({ embeds: [embed] });
			return;
		}

		connect();
	},
};