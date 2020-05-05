import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

import redis from 'utils/redis';
import { PROJECT_NAME, RESOURCE_NOT_FOUND } from 'helpers/constants';

function notFound(settings, resolve, reject) {
  if (settings.resolveIfNotFound) {
    resolve(undefined);
  } else {
    reject(RESOURCE_NOT_FOUND);
  }
}

export default function datumLoadSingle(settings) {
  // load(req) {
  return new Promise((resolve, reject) => {
    redis.lrange(
      `${PROJECT_NAME}_${settings.redisKey}`,
      0,
      -1,
      (err, reply) => {
        let orderedReply = reply;
        if (settings.sortKey) {
          orderedReply = reverse(sortBy(orderedReply, [settings.sortKey]));
        }
        for (let inc = 0; inc < orderedReply.length; inc += 1) {
          const value = JSON.parse(orderedReply[inc]);
          if (!settings.filter || settings.filter(value)) {
            if (settings.includeDeleted || !value.deleted) {
              resolve(value);
              return;
            }
          }
        }
        notFound(settings, resolve, reject);
      },
    );
  });
}
