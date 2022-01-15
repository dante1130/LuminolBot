module.exports = {
	name: 'messageCreate',
	execute(message) {
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
	},
};