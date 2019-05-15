import { datumLoad } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_READ } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import paymentsAllowedAttributes from './paymentsAllowedAttributes';

export default function load(req) {
  const reqSecured = reqSecure(req, paymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoad({
              redisKey: 'payments',
              includeOwnerUname: true,
              includeDeleted: user && user.admin,
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
