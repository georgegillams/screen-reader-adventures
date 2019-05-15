import datumLoad from './datumLoad';
import redis from 'utils/redis';
import { find } from 'utils/find';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';

export default function datumCreate(settings, req) {
  return new Promise((resolve, reject) => {
    const newValue = req.body;
    const requestedId = newValue.requestedId;
    newValue.id = Math.random()
      .toString(36)
      .substring(7);

    datumLoad({ redisKey: settings.redisKey }).then(existingData => {
      if (requestedId) {
        const { existingValue: entityWithSameId } = find(
          existingData,
          requestedId,
        );
        if (!entityWithSameId) {
          newValue.id = requestedId;
        }
      }

      newValue.timestamp = Date.now();
      newValue.lastUpdatedTimestamp = newValue.timestamp;
      newValue.authorId = settings.user ? settings.user.id : undefined;
      // Write to redis:
      redis.rpush([settings.redisKey, JSON.stringify(newValue)]);
      if (
        settings.redisKey !== 'sessions' &&
        settings.redisKey !== 'contentUpdates'
      ) {
        setContentLastUpdatedTimestamp();
      }
      datumLoad(req).then(
        data => {
          if (req.session) {
            req.session[settings.redisKey] = data;
          }
          resolve(newValue);
        },
        err => {
          reject(err);
        },
      );
    });
  });
}
