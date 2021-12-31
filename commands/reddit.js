const redditFetch = require('reddit-fetch');

module.exports  = {
    name: 'reddit',
    description: "Returns a hot post from a subreddit.",
    usage: "<subreddit>",
    category: "Fetch posts",
    
    execute(message, args) {
        let sub = 'all';

        if (args[0]) sub = args[0];

        redditFetch({
            subreddit: sub,
            sort: 'hot',
            allowNSFW: false,
            allowModPost: false,
            allowCrossPost: true,
        }).then(post => {
            message.channel.send(post.url);
        });
    }
};
