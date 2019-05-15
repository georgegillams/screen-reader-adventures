import datumLoad from './datumLoad';
import redis from 'utils/redis';
import { find } from 'utils/find';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';

export default function datumUpdate(settings, req) {
  return new Promise((resolve, reject) => {
    // Need to unset all of these, as alternative values will affect the index, and cause the redis update command to update the wrong entry
    settings.includeDeleted = true;
    settings.sortKey = null;
    settings.filter = null;

    datumLoad(settings, req).then(
      data => {
        const values = data;
        const value = req.body;
        const { existingValue, existingValueIndex } = find(values, value.id);

        if (existingValue) {
          // Persist unchangeable values
          value.timestamp = existingValue.timestamp;
          value.lastUpdatedTimestamp = Date.now();
          value.authorId = existingValue.authorId;

          values[existingValueIndex] = value;
          redis.lset(
            settings.redisKey,
            existingValueIndex,
            JSON.stringify(value),
          );
          if (
            settings.redisKey !== 'sessions' &&
            settings.redisKey !== 'contentUpdates'
          ) {
            setContentLastUpdatedTimestamp();
          }
        }
        if (req.session) {
          req.session[settings.redisKey] = values;
        }
        resolve(value);
      },
      err => {
        reject(err);
      },
    );
  });
}
