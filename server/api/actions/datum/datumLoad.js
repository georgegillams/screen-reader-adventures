import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

import redis from 'utils/redis';
import { find } from 'utils/find';

export default function datumLoad(settings) {
  // load(req) {
  return new Promise(resolve => {
    if (settings.includeOwnerUname && settings.redisKey !== 'users') {
      datumLoad({ redisKey: 'users' }).then(userData => {
        redis.lrange(settings.redisKey, 0, -1, (err, reply) => {
          let result = [];
          for (let inc = 0; inc < reply.length; inc += 1) {
            const value = JSON.parse(reply[inc]);

            if (value.authorId) {
              const { existingValue: commentOwner } = find(
                userData,
                value.authorId,
              );

              let ownerUname = 'Anon';
              if (commentOwner && commentOwner.uname) {
                ownerUname = commentOwner.uname;
              }

              value.ownerUname = ownerUname;
              if (settings.removeFields) {
                settings.removeFields.forEach(rf => {
                  value[rf] = null;
                });
              }
            }
            if (!settings.filter || settings.filter(value)) {
              if (!value.deleted || settings.includeDeleted) {
                result.push(value);
              }
            }
          }

          if (settings.sortKey) {
            result = reverse(sortBy(result, [settings.sortKey]));
          }

          resolve(result);
        });
      });
    } else {
      redis.lrange(settings.redisKey, 0, -1, (err, reply) => {
        let result = [];
        for (let inc = 0; inc < reply.length; inc += 1) {
          const value = JSON.parse(reply[inc]);
          if (!settings.filter || settings.filter(value)) {
            if (!value.deleted || settings.includeDeleted) {
              result.push(value);
            }
          }
          if (settings.removeFields) {
            settings.removeFields.forEach(rf => {
              value[rf] = null;
            });
          }
        }

        if (settings.sortKey) {
          result = reverse(sortBy(result, [settings.sortKey]));
        }

        resolve(result);
      });
    }
  });
}
