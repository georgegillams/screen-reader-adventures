import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbLoad } from 'utils/database';
import authentication from 'utils/authentication';
import { UNAUTHORISED_READ } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function load(req) {
  reqSecure(req, usersAllowedAttributes);
  return authentication(req).then(user => {
    if (user && user.admin) {
      return dbLoad({ includeDeleted: true, redisKey: 'users' });
    }
    throw UNAUTHORISED_READ;
  });
}
