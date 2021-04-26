import loadAllValues from './private/loadAllValues';

import redis from 'server-utils/common/redis';
import { find } from 'server-utils/common/find';
import appConfig from 'helpers/appConfig';
import { RESOURCE_NOT_FOUND } from 'server-utils/common/errorConstants';

export default function dbUpdate(settings, req) {
  // finds matching element - should use redis method directly
  // if no matching, throw RESOURCE_NOT_FOUND
  // if matching value, writes (persisting un-writable values)

  const value = req.body;
  return loadAllValues(settings.redisKey).then(existingData => {
    const { existingValue, existingValueIndex } = find(existingData, value.id);
    if (!existingValue || existingValue.deleted) {
      throw RESOURCE_NOT_FOUND;
    }
    value.timestamp = existingValue.timestamp;
    value.lastUpdatedTimestamp = Date.now();
    value.authorId = existingValue.authorId;
    value.requestedId = existingValue.requestedId;

    redis.lset(`${appConfig.projectName}_${settings.redisKey}`, existingValueIndex, JSON.stringify(value));
    return true;
  });
}
