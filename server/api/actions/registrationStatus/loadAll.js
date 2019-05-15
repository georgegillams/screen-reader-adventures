import { datumLoad, datumLoadSingle, datumCreate } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import getRegistrationStatus from 'utils/getRegistrationStatus';
import { UNAUTHORISED_READ } from 'helpers/constants';
import registratiomStatusAllowedAttributes from './registratiomStatusAllowedAttributes';
import { find } from 'utils/find';

export default function loadAll(req) {
  const reqSecured = reqSecure(req, registratiomStatusAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          datumLoad({ redisKey: 'users', includeDeleted: true }).then(
            userData => {
              const requests = userData.map(u => {
                return new Promise(resolve => {
                  getRegistrationStatus(u).then(result => {
                    resolve(result);
                  });
                });
              });

              Promise.all(requests).then(result => resolve(result));
            },
          );
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
