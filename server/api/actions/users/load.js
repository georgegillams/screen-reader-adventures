import { datumLoad } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_READ } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import usersAllowedAttributes from './usersAllowedAttributes';

export default function create(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(datumLoad({ includeDeleted: true, redisKey: 'users' }));
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
