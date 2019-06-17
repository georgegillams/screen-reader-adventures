import { datumCreate, datumLoad } from '../datum';

import usersAllowedAttributes from './usersAllowedAttributes';

import authentication from 'utils/authentication';
import { hash } from 'utils/hash';
import { find, emailFingerprint } from 'utils/find';
import { sendEmailVerificationEmail } from 'utils/emailHelpers';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import loginUser from 'utils/login';

export default function create(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        datumLoad({ redisKey: 'users' }).then(userData => {
          // Only admins can create admins!
          if ((user && user.admin) || !reqSecured.body.admin) {
            // If a user already has the username, we cannot allow a new one to be created
            const { existingValue: userWithSameUname } = find(
              userData,
              reqSecured.body.uname,
              'uname',
            );
            const { existingValue: userWithSameEmail } = find(
              userData,
              emailFingerprint(reqSecured.body.email),
              'emailFingerprint',
            );
            if (userWithSameUname || userWithSameEmail) {
              reject({
                error: 'A user with that username or email already exists',
                reason: 'A user with that username already exists',
              });
            } else {
              if (reqSecured.body.password) {
                reqSecured.body.hash = hash(reqSecured.body.password);
                reqSecured.body.password = null;
              }
              reqSecured.body.emailFingerprint = emailFingerprint(
                reqSecured.body.email,
              );
              reqSecured.body.email = reqSecured.body.email.toLowerCase();
              reqSecured.body.emailVerified = false;
              datumCreate({ redisKey: 'users', user }, reqSecured).then(
                newUser => {
                  sendEmailVerificationEmail(newUser);
                  loginUser(reqSecured, newUser, resolve, reject);
                },
              );
            }
          } else {
            reject(UNAUTHORISED_WRITE);
          }
        });
      },
      err => reject(err),
    );
  });
}
