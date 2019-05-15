import { datumLoad } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import notificationsAllowedAttributes from './notificationsAllowedAttributes';

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
