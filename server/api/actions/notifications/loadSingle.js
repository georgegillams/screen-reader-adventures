import { datumLoadSingle } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadSingle(req) {
  const reqSecured = reqSecure(req, notificationsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(
          datumLoadSingle({
            redisKey: 'notifications',
            includeDeleted: user && user.admin,
            filter: ar => ar.id === reqSecured.query.id,
          }),
        );
      },
      err => reject(err),
    );
  });
}
