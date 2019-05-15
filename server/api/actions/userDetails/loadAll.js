import { datumLoad } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import userDetailsAllowedAttributes from './userDetailsAllowedAttributes';

export default function loadAll(req) {
  const reqSecured = reqSecure(req, userDetailsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoad({
              redisKey: 'userDetails',
              includeOwnerUname: true,
              includeDeleted: true,
            }),
          );
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
