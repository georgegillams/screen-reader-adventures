import { datumLoad } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import { find, emailFingerprint } from 'utils/find';
import reqSecure from 'utils/reqSecure';

export default function emailtaken(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise(resolve => {
    setTimeout(() => {
      datumLoad({ redisKey: 'users' }).then(userData => {
        // `find` uses `safeCompare` so it protects against user-enumeration
        const { existingValue: userWithEmail } = find(
          userData,
          emailFingerprint(reqSecured.body.email),
          'emailFingerPrint',
        );
        if (userWithEmail) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }, 750);
  });
}
