const redditFetch = require('reddit-fetch');

module.exports  = {
    name: 'reddit',
    description: "gets a reddit post",

    execute(message, args) {
        var sub = 'all';

        if (args[0]) {
            sub = args[0];
        }

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
    }
