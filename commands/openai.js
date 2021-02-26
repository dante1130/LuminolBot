const OpenAI = require('openai-api');
require('dotenv').config();
const api = new OpenAI(process.env.OPEN_AI_API_KEY);

module.exports = {
    name: 'openai',
    description: "Uses the complete functio of OpenAI.",

    execute(message, args) {
        var userInput = args.join(' ');

        (async () => {
            const gptResponse = await api.complete({
                engine: 'davinci',
                prompt: userInput,
                maxTokens: 100
            });
                    
            message.channel.send(userInput + gptResponse.data.choices[0].text);
        })();
    }
}