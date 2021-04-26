import sendEmailVerificationEmail from '../auth/private/sendEmailVerificationEmail';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbLoad, dbUpdate } from 'server-utils/common/database';
import { InvalidInputError } from 'server-utils/common/errors';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { hash } from 'server-utils/common/hash';
import { find, emailFingerprint } from 'server-utils/common/find';
import { userOwnsResource } from 'server-utils/common/userOwnsResource';
import { UNAUTHORISED_WRITE, RESOURCE_NOT_FOUND } from 'server-utils/common/errorConstants';
import reqSecure from 'server-utils/common/reqSecure';

export default function update(req) {
  reqSecure(req, usersAllowedAttributes);
  let userOwnsResourceResult = false;
  let emailVerificationRequired = false;
  let user = null;
  return lockPromise('users', () =>
    authentication(req)
      .then(authenticatedUser => {
        user = authenticatedUser;
        if (!user) {
          throw UNAUTHORISED_WRITE;
        }
        return true;
      })
      .then(() => userOwnsResource('users', req.body.id, user))
      .then(result => {
        userOwnsResourceResult = result;
        return userOwnsResourceResult;
      })
      .then(() => dbLoad({ redisKey: 'users' }))
      .then(userData => {
        const { existingValue: userBeingUpdated } = find(userData, req.body.id);
        if (!userBeingUpdated) {
          throw RESOURCE_NOT_FOUND;
        }

        // The user editing must either be the user themselves, or an admin
        if (!user.admin && !userOwnsResourceResult) {
          throw UNAUTHORISED_WRITE;
        }

        // Only an admin can upgrade someone to admin!
        if (req.body.admin && (!user || !user.admin)) {
          throw UNAUTHORISED_WRITE;
        }

        const otherUsersWithSameUname = userData.filter(u => u.uname === req.body.uname && u.id !== req.body.id);

        // If another user already with the same username, we cannot allow it to be updated, as usernames must be unique
        if (otherUsersWithSameUname.length > 0) {
          throw new InvalidInputError('A user with that username already exists');
        }

        if (req.body.password) {
          req.body.hash = hash(req.body.password);
          req.body.password = null;
        } else {
          req.body.hash = userBeingUpdated.hash;
        }

        // If user email has changed, it need re-verifying
        emailVerificationRequired = req.body.email !== userBeingUpdated.email;
        if (emailVerificationRequired) {
          req.body.email = req.body.email.toLowerCase();
          req.body.emailVerified = false;
          req.body.emailFingerprint = emailFingerprint(req.body.email);
        } else {
          req.body.emailFingerprint = userBeingUpdated.emailFingerprint;
          req.body.emailVerified = userBeingUpdated.emailVerified;
        }
        return true;
      })
      .then(() => dbUpdate({ redisKey: 'users' }, req))
      .then(() => {
        if (emailVerificationRequired) {
          return sendEmailVerificationEmail(req.body);
        }
        return true;
      })
      .then(() => true)
  );
}
