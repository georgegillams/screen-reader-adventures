import { datumLoad, datumUpdate } from '../datum';

import usersAllowedAttributes from './usersAllowedAttributes';

import authentication from 'utils/authentication';
import { hash } from 'utils/hash';
import { find, emailFingerprint } from 'utils/find';
import { userOwnsResource } from 'utils/userOwnsResource';
import { sendEmailVerificationEmail } from 'utils/emailHelpers';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        userOwnsResource('users', reqSecured.body.id, user).then(
          userOwnsResourceResult => {
            datumLoad({ redisKey: 'users' }).then(userData => {
              const { existingValue: userBeingUpdated } = find(
                userData,
                reqSecured.body.id,
              );
              // TODO REMOVE userBeingUpdated FROM userData otherwise the find will return the user themselves!
              // Users should be able to update their own user
              if (user && (user.admin || userOwnsResourceResult)) {
                // Only admins can make people admins!
                if ((user && user.admin) || !reqSecured.body.admin) {
                  // If another user already with the same username, we cannot allow it to be updated
                  const { existingValue: userWithSameUname } = find(
                    userData,
                    reqSecured.body.uname,
                    'uname',
                  );
                  if (
                    userWithSameUname &&
                    userWithSameUname.id !== reqSecured.body.id
                  ) {
                    reject({
                      error: 'user already exists',
                      reason: 'A user with that username already exists',
                    });
                  } else {
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
                  }
                } else {
                  reject(UNAUTHORISED_WRITE);
                }
              } else {
                reject(UNAUTHORISED_WRITE);
              }
            });
          },
        );
      },
      err => reject(err),
    );
  });
}
