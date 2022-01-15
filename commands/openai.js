const OpenAI = require('openai-api');
const { openaiApiKey } = require('../config.json');
const api = new OpenAI(openaiApiKey);

module.exports = {
	name: 'openai',
	description: 'Use OpenAI to complete a given prompt.',
	usage: '<prompt>',
	category: 'Fun',

	execute(message, args) {
		const minToken = 0;
		const maxToken = 360;
		let specTokens = 128;

		if (args[0].startsWith('[') && args[0].endsWith(']')) {
			const tokens = args[0].replace(/[[\]]+/g, '');
			if (tokens > minToken && tokens <= maxToken) {
				specTokens = tokens;
				args.shift();
			}
			else {
				message.channel.send(`Unknown specification or out of range of ${minToken} and ${maxToken}. Defaulting to 128.`);
			}
		}

		const userInput = args.join(' ');

		(async () => {
			const gptResponse = await api.complete({
				engine: 'davinci',
				prompt: userInput,
				maxTokens: specTokens,
				temperature: 0.5,
				topP: 1,
				presencePenalty: 1,
				frequencyPenalty: 1,
				bestOf: 1,
				n: 1,
				stream: false,
			});
			message.channel.send(userInput + gptResponse.data.choices[0].text);
		})();

	},
};