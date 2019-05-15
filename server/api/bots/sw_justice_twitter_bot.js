const TwitterBot = require('node-twitterbot').TwitterBot;
const moment = require('moment');

const Bot = process.env.BOT_CONSUMER_KEY
  ? new TwitterBot({
      consumer_key: process.env.BOT_CONSUMER_KEY,
      consumer_secret: process.env.BOT_CONSUMER_SECRET,
      access_token: process.env.BOT_ACCESS_TOKEN,
      access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
    })
  : null;

const timeOfRejection = moment('20/09/2018 16:37', 'D/M/YYYY HH:mm');

function tweet() {
  const currentTime = moment();
  const diffDays = currentTime.diff(timeOfRejection, 'days');
  let diffHours = currentTime.diff(timeOfRejection, 'hours');
  diffHours -= diffDays * 24;

  const phrase = `@SW_Railway on 18 September the 1748 service from London Waterloo to Southampton Central, due to arrive at 1918, was delayed by > 20 minutes. Yet you've been rejecting my claim DR-4101-4521 for ${diffDays} days, ${diffHours} hours.`;

  console.log(`tweeting:`, phrase);
  if (Bot) {
    Bot.tweet(phrase);
  }
}

setInterval(tweet, 3 * 60 * 60 * 1000);
