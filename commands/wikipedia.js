const { MessageEmbed } = require('discord.js');
const wiki = require('wtf_wikipedia');

module.exports = {
	name: 'wikipedia',
	description: 'Returns a Wikipedia page.',
	usage: '<query>',
	category: 'Fetch posts',

	async execute(message) {
		const args = message.content.split(' ').slice(1);

		const embed = new MessageEmbed();

		if (!args[0]) {
			embed.setTitle('No query detected!')
				.setColor('#FF0000')
				.setDescription('e!wikipedia <query>');
			await message.reply({ embeds: [embed] });
			return;
		}

		const searchTerm = args.join(' ');
		wiki.fetch(searchTerm).then((doc) => {
			message.reply(doc.url());
		}).catch(err => {
			console.error(err);
		});
	},
};