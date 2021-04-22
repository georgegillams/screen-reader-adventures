import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import reqSecure from 'server-utils/common/reqSecure';

export default function load(req) {
  reqSecure(req, usersAllowedAttributes);
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return dbLoad({ includeDeleted: true, redisKey: 'users' });
      }
      throw UNAUTHORISED_READ;
    })
    .then(users => ({ users }));
}
