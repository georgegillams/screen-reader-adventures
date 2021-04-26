# Database

This project uses a Redis database. On server start, the server will wait for a redis-connection to become available.

Database reads/writes can be easily handled using the db helper functions in [`utils/common/database`](https://github.com/georgegillams/screen-reader-adventures/blob/master/server/utils/common/database).

The methods automatically prefix collections with the project name. For example, `dbCreate({redisKey: 'myThings'}...)` will write to a collection called `PROJECT_NAME_myThings`. This means you can host multiple projects using the same redis instance without sharing data.
