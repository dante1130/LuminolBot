const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ask',
	description: 'Ask Ema and she will answer with science!',
	usage: '<question>',
	category: 'Fun',

	async execute(message) {
		const args = message.content.split(' ').slice(1);

		const question = args.join(' ').toLowerCase();
		const embed = new MessageEmbed()
			.setTitle(question)
			.setColor('#00FFFF');

		const responses = ['as I see it, yes.',
			'ask again later.',
			'better not tell you now.',
			'cannot predict now.',
			'concentrate and ask again.',
			'don\'t count on it.',
			'it is certain.',
			'it is decidedly so.',
			'most likely.',
			'my reply is no.',
			'my sources say no.',
			'outlook not so good.',
			'outlook good.',
			'reply hazy, try again.',
			'signs point to yes.',
			'very doubtful.',
			'without a doubt.',
			'yes.',
			'yes - definitely.',
			'you may rely on it.'];

		if (question.includes('why are we still here')) {
			const file = new MessageAttachment('./images/Sad.gif');

			embed.setDescription(`Just to suffer? Every night, I can feel my leg... And my arm... even my fingers... 
                                  The body I've lost... the comrades I've lost... won't stop hurting... 
                                  It's like they're all still there. You feel it, too, don't you? I'm gonna make them give back our past!`)
				.setImage('attachment://Sad.gif');

			await message.reply({ embeds: [embed], files: [file] });
		}
		else if (question.includes('why are you gay')) {
			const file = new MessageAttachment('./images/thinking.gif');

			embed.setDescription('Who says I\'m gay?')
				.setImage('attachment://thinking.gif');

			await message.reply({ embeds: [embed], files: [file] });
		}
		else {
			const file = new MessageAttachment('./images/DS.gif');

			const response = responses[Math.floor(Math.random() * responses.length)];
			embed.setDescription(`So, to scientically analyze the data available so far, ${response}`)
				.setImage('attachment://DS.gif');

			await message.reply({ embeds: [embed], files: [file] });
		}
	},
};