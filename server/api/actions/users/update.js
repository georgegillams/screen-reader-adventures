import { datumLoad, datumUpdate } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { hash } from 'utils/hash';
import { find, emailFingerprint } from 'utils/find';
import { userOwnsResource } from 'utils/userOwnsResource';
import { sendEmailVerificationEmail } from 'utils/emailHelpers';
import { UNAUTHORISED_WRITE, RESOURCE_NOT_FOUND } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return lockPromise(
    'users',
    () =>
      new Promise((resolve, reject) => {
        authentication(reqSecured).then(
          user => {
            userOwnsResource('users', reqSecured.body.id, user).then(
              userOwnsResourceResult => {
                datumLoad({ redisKey: 'users' }).then(userData => {
                  const { existingValue: userBeingUpdated } = find(
                    userData,
                    reqSecured.body.id,
                  );
                  // Users should be able to update their own user
                  if (!userBeingUpdated) {
                    reject(RESOURCE_NOT_FOUND);
                    return;
                  }

                  if (!user) {
                    reject(UNAUTHORISED_WRITE);
                    return;
                  }

                  // The user editing must either be the user themselves, or an admin
                  if (!user.admin && !userOwnsResourceResult) {
                    reject(UNAUTHORISED_WRITE);
                    return;
                  }

                  // Only admins can upgrade someone to being admins!
                  if (reqSecured.body.admin && (!user || !user.admin)) {
                    reject(UNAUTHORISED_WRITE);
                    return;
                  }

                  const otherUsersWithSameUname = userData.filter(
                    u =>
                      u.uname === reqSecured.body.uname &&
                      u.id !== reqSecured.body.id,
                  );

                  // If another user already with the same username, we cannot allow it to be updated, as usernames must be unique
                  if (otherUsersWithSameUname.length > 0) {
                    reject({
                      error: 'user already exists',
                      errorMessage: 'A user with that username already exists',
                    });
                    return;
                  }

                  if (reqSecured.body.password) {
                    reqSecured.body.hash = hash(reqSecured.body.password);
                    reqSecured.body.password = null;
                  } else {
                    reqSecured.body.hash = userBeingUpdated.hash;
                  }

                  // IF USER EMAIL HAS CHANGED, IT NEED RE-VERIFYING
                  const emailVerificationRequired =
                    reqSecured.body.email !== userBeingUpdated.email;
                  if (emailVerificationRequired) {
                    reqSecured.body.email = reqSecured.body.email.toLowerCase();
                    reqSecured.body.emailVerified = false;
                    reqSecured.body.emailFingerprint = emailFingerprint(
                      reqSecured.body.email,
                    );
                  } else {
                    reqSecured.body.emailFingerprint =
                      userBeingUpdated.emailFingerprint;
                    reqSecured.body.emailVerified =
                      userBeingUpdated.emailVerified;
                  }

                  datumUpdate({ redisKey: 'users' }, reqSecured).then(
                    updatedUser => {
                      if (emailVerificationRequired) {
                        sendEmailVerificationEmail(updatedUser);
                      }
                      resolve(updatedUser);
                    },
                  );
                });
              },
            );
          },
          err => reject(err),
        );
      }),
  );
}
