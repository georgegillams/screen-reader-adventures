import { datumRemove } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import notificationsAllowedAttributes from './notificationsAllowedAttributes';

export default function remove(req) {
  const reqSecured = reqSecure(req, notificationsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(datumRemove({ redisKey: 'notifications' }, reqSecured));
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
