import { find } from './find';

import { dbLoad } from 'utils/database';

const determineIfUserOwnsResource = (redisKey, resourceId, user) =>
  dbLoad({ redisKey }).then(data => {
    const { existingValue } = find(data, resourceId);
    if (existingValue) {
      return existingValue.authorId === user.id;
    }
    return false;
  });

const userOwnsResource = (redisKey, resourceId, user) =>
  Promise.resolve().then(() => {
    if (!user) {
      return false;
    }
    // Users should be honorary owners of themselves:
    if (redisKey === 'users' && resourceId === user.id) {
      return true;
    }
    return determineIfUserOwnsResource(redisKey, resourceId, user);
  });

export default userOwnsResource;
export { userOwnsResource };
