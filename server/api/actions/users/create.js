import sendEmailVerificationEmail from '../auth/private/sendEmailVerificationEmail';
import { InvalidInputError } from '../../../utils/errors';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbCreate, dbLoad } from 'utils/database';
import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { hash } from 'utils/hash';
import { find, emailFingerprint } from 'utils/find';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  reqSecure(req, usersAllowedAttributes);
  let authenticatedUser = null;
  let newUser = null;
  return lockPromise('users', () =>
    authentication(req)
      .then(user => {
        authenticatedUser = user;
        return dbLoad({ redisKey: 'users' });
      })
      .then(userData => {
        // Only admin can create an admin!
        if ((authenticatedUser && authenticatedUser.admin) || !req.body.admin) {
          // If a user already has the username, we cannot allow a new one to be created
          const { existingValue: userWithSameUname } = find(
            userData,
            req.body.uname,
            'uname',
          );
          const { existingValue: userWithSameEmail } = find(
            userData,
            emailFingerprint(req.body.email),
            'emailFingerprint',
          );
          if (userWithSameUname || userWithSameEmail) {
            throw new InvalidInputError(
              'A user with that username or email already exists',
            );
          }
          if (req.body.password) {
            req.body.hash = hash(req.body.password);
            req.body.password = null;
          }
          req.body.emailFingerprint = emailFingerprint(req.body.email);
          req.body.email = req.body.email.toLowerCase();
          req.body.emailVerified = false;
          return dbCreate({ redisKey: 'users', authenticatedUser }, req);
        }
        throw UNAUTHORISED_WRITE;
      })
      .then(result => {
        newUser = result;
        return sendEmailVerificationEmail(newUser);
      })
      .then(() => ({ message: 'User created', newUser })),
  );
}
