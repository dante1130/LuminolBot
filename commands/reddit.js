const redditFetch = require('reddit-fetch');

module.exports = {
	name: 'reddit',
	description: 'Returns a hot post from a subreddit.',
	usage: '<subreddit>',
	category: 'Fetch posts',

	async execute(message) {
		const args = message.content.split(' ').slice(1);

		let sub = 'all';

		if (args[0]) sub = args[0];

		await redditFetch({
			subreddit: sub,
			sort: 'hot',
			allowNSFW: false,
			allowModPost: false,
			allowCrossPost: true,
		}).then(post => {
			message.reply(post.url);
		});
	},
};
