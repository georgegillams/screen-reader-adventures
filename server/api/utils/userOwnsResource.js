import { datumLoad } from '../actions/datum';
import { find } from './find';

export function userOwnsResource(redisKey, resourceId, user) {
  return new Promise(resolve => {
    if (!user) {
      resolve(false);
      // Users should be honary owners of themselves:
    } else if (redisKey === 'users' && resourceId === user.id) {
      resolve(true);
    } else {
      datumLoad({ redisKey }).then(data => {
        const { existingValue } = find(data, resourceId);
        if (existingValue) {
          resolve(existingValue.authorId === user.id);
        } else {
          resolve(false);
        }
      });
    }
  });
}
