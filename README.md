# [https://www.screen-reader-adventures.com/](https://www.screen-reader-adventures.com/)

![Travis status](https://api.travis-ci.org/georgegillams/screen-reader-adventures.com?branch=master)

This repo was originally a fork of [Dinesh Pandiyan's React Redux Boilerplate app](https://github.com/flexdinesh/react-redux-boilerplate).

This is the code for Screen Reader Adventures, an online game that makes it fun to learn how to use a screen reader!. The project uses React, Redux, and has a Node API which talks to a Redis database.

## Running
Ensure that redis is installed

```
npm i
npm run dev
```

`npm run dev` will start a `redis-server` instance and set all necessary environment variables needed to run the application.

## API

## Hosting on Heroku
To host this on Heroku, you will need to add the [Heroku-redis Add-on](https://devcenter.heroku.com/articles/heroku-redis) and ensure the following environment variables are created:

| Env var             | Reason                                 | Value                                                |
| ------------------- | -------------------------------------- | -----------------------------------------------------|
| GSUITE_APP_PASSWORD | To send emails from your Gmail account | The password generated to access yout G-Suite account|
| GSUITE_EMAIL        | To send emails from your Gmail account | Your G-Suite email address                           |
| NODE_ENV            | Makes the magic happen                 | `production`                                         |
| REDIS_URL           | To access the redis database           | \<Created by the Add-on\>                            |
| SECRET_API_KEY      | Used to make admin API requests        | Anything secret and impossible to guess              |

## Contributing
Contributions are welcome. Please fork and submit a PR if you want to add or change a feature.
