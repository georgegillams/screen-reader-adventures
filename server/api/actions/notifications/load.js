import { datumLoad } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function load(req) {
  const reqSecured = reqSecure(req, notificationsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(
          datumLoad({
            redisKey: 'notifications',
            includeDeleted: user && user.admin,
          }),
        );
      },
      err => reject(err),
    );
  });
}
