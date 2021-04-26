import loadAllValues from './private/loadAllValues';
import dbUpdate from './dbUpdate';

import { RESOURCE_NOT_FOUND } from 'server-utils/common/errorConstants';
import { find } from 'server-utils/common/find';

export default function dbRemove(settings, req) {
  return loadAllValues(settings.redisKey).then(data => {
    const { existingValue } = find(data, req.body.id);

    if (!existingValue) {
      throw RESOURCE_NOT_FOUND;
    }

    const value = JSON.parse(JSON.stringify(existingValue));
    value.deleted = true;

    return dbUpdate(settings, { body: value });
  });
}
