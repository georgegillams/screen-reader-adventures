import { datumLoad, datumUpdate } from '../datum';

import authAllowedAttributes from './private/authAllowedAttributes';

import { find } from 'utils/find';
import { INVALID_SESSION, INVALID_CREDENTIALS } from 'helpers/constants';
import { hash, compareHash } from 'utils/hash';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';
import loginUser from 'utils/login';

export default function login(req) {
  const reqSecured = reqSecure(req, authAllowedAttributes);
  return new Promise((resolve, reject) => {
    // Using datum load as we want to avoid invoking authentication when loading users data here
    datumLoad({ redisKey: 'users' }).then(userData => {
      const { existingValue: userProfile } = find(
        userData,
        reqSecured.body.email.toLowerCase(),
        'email',
      );
      if (userProfile) {
        if (
          !userProfile.hash ||
          !compareHash(reqSecured.body.password, userProfile.hash)
        ) {
          reject(INVALID_CREDENTIALS);
        } else {
          loginUser(reqSecured, userProfile).then(loginResult => {
            resolve(loginResult);
          });
        }
      } else {
        reject(INVALID_CREDENTIALS);
      }
    });
  });
}
