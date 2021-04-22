import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbRemove } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { userOwnsResource } from 'server-utils/common/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import reqSecure from 'server-utils/common/reqSecure';

export default function remove(req) {
  reqSecure(req, usersAllowedAttributes);
  let user = null;
  return authentication(req)
    .then(authenticatedUser => {
      user = authenticatedUser;
      return true;
    })
    .then(() => userOwnsResource('users', req.body.id, user))
    .then(userOwnsResourceResult => {
      // Users should be able to delete their own user
      if (user && (user.admin || userOwnsResourceResult)) {
        return dbRemove({ redisKey: 'users' }, req);
      }
      throw UNAUTHORISED_WRITE;
    });
}
