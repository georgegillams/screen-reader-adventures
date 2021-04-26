# [https://screen-reader-adventures.com/](https://screen-reader-adventures.com/?utm_source=GitHub)

![Build status](https://github.com/georgegillams/screen-reader-adventures/workflows/CI/badge.svg)
![Dependencies status](https://img.shields.io/david/georgegillams/screen-reader-adventures)

This is the code for screen-reader-adventures.com - a fun way to learn to use a screen-reader.

The aim of this project is to give sighted designers and engineers the ability to use a screen-reader effectively so that they can build better products for people who rely on assistive technology.

## Developing

### Prerequisites

Ensure redis is installed (`brew install redis`).

### Running locally

```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci
npm run dev
```

`npm run dev` will set all necessary environment variables needed to run the application.

A debugger can be attached to debug server-side code.

### Testing

If components have changed, snapshot tests may need to be updated. Backstop js visual regression tests may also need to be updated.

To update jest snapshots:

```
npx jest -u
```

To update backstopJS snapshots:

```
./scripts/docker/prepare.sh
./scripts/docker/run-tests.sh --update
./scripts/docker/clean-up.sh'
```

- The first will setup the docker image and container. If they already exist this will be super fast.
- The second will copy the project over, setup dependencies, build and run, and take screenshots. Failed screenshots will be copied back to your machine.
- The third simply stops the docker container.

Any changes resulting from these commands should be verified and checked in.

## Hosting

Both `dependencies` and `devDependencies` should be used for development, testing, CI, and building.

Only `dependencies` should be used when running the production app. To install prod dependencies only, use `npm ci --only=prod`.

The following environment variables should be set up

| Env var             | Reason                                 | Value                                                                     |
| ------------------- | -------------------------------------- | ------------------------------------------------------------------------- |
| GSUITE_APP_PASSWORD | To send emails from your Gmail account | The password generated to access yout G-Suite account                     |
| GSUITE_EMAIL        | To send emails from your Gmail account | Your G-Suite email address                                                |
| REDIS_URL           | To access the redis database.          | If no URL is provided, the server will connect to a local redis instance. |
| SECRET_API_KEY      | Used to make admin API requests        | Anything secret and impossible to guess                                   |

### Hosting on Heroku

To host this on Heroku, you will need to add the [Heroku-redis Add-on](https://devcenter.heroku.com/articles/heroku-redis). Doing so will create a the REDIS_URL environment variable required to connect to the DB.

## Contributing

Contributions are welcome. Please fork and submit a PR if you want to add or change a featurej.
