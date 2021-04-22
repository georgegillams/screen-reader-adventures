import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

import loadAllValues from './private/loadAllValues';

import { find } from 'server-utils/common/find';

const attachUNames = results =>
  loadAllValues('users').then(userData => {
    const attachedResults = results.map(value => {
      let ownerUname = 'Anon';
      if (value.authorId) {
        const { existingValue: owner } = find(userData, value.authorId);

        if (owner && owner.uname) {
          ownerUname = owner.uname;
        }
      }
      return { ...value, ownerUname };
    });
    return attachedResults;
  });

export default function dbLoad(settings) {
  // load all values
  // remove deleted
  // filter
  // sort
  // attach ownerUname
  return loadAllValues(settings.redisKey)
    .then(data => {
      let result = [];
      for (let ind = 0; ind < data.length; ind += 1) {
        const value = data[ind];

        if (settings.removeFields) {
          settings.removeFields.forEach(rf => {
            delete value[rf];
          });
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

      return result;
    })
    .then(result => {
      if (!settings.includeOwnerUname || settings.redisKey === 'users') {
        return result;
      }
      return attachUNames(result);
    });
}
