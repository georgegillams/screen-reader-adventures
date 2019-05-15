import { datumLoad } from '../datum';
import { find, emailFingerprint } from 'utils/find';
import reqSecure from 'utils/reqSecure';
import usersAllowedAttributes from './usersAllowedAttributes';

export default function emailtaken(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise(resolve => {
    setTimeout(() => {
      datumLoad({ redisKey: 'users' }).then(userData => {
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
