import { datumLoad } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_READ } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumLoad({ includeDeleted: true, redisKey: 'magiclinks' }));
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
