import { datumLoad } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import { find } from 'utils/find';
import reqSecure from 'utils/reqSecure';

export default function unametaken(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise(resolve => {
    setTimeout(() => {
      datumLoad({ redisKey: 'users' }).then(userData => {
        const { existingValue: userWithUname } = find(
          userData,
          reqSecured.body.uname,
          'uname',
        );
        if (userWithUname) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }, 750);
  });
}
