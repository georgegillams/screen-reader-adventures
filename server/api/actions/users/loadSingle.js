import { datumLoadSingle } from '../datum';

import { UNAUTHORISED_READ } from 'helpers/constants';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadSingle(req) {
  const reqSecured = reqSecure(req, []);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoadSingle({
              redisKey: 'users',
              filter: ar => ar.id === reqSecured.query.id,
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
