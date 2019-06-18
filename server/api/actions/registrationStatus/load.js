import { datumLoad, datumLoadSingle, datumCreate } from '../datum';

import registratiomStatusAllowedAttributes from './registratiomStatusAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import getRegistrationStatus from 'utils/getRegistrationStatus';
import { REG_EMAIL, UNAUTHORISED_READ } from 'helpers/constants';
import { find } from 'utils/find';

export default function load(req) {
  const reqSecured = reqSecure(req, registratiomStatusAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (
          user &&
          (user.admin || user.email === REG_EMAIL) &&
          reqSecured.body.userId
        ) {
          resolve(getRegistrationStatus({ id: reqSecured.body.userId }));
        } else if (user) {
          resolve(getRegistrationStatus(user));
        } else {
          resolve(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
