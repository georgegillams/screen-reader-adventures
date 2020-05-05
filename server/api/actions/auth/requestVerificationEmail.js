import { datumLoad, datumUpdate } from '../datum';

import authAllowedAttributes from './private/authAllowedAttributes';

import { find } from 'utils/find';
import authentication from 'utils/authentication';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';
import { sendEmailVerificationEmail } from 'utils/emailHelpers';
import { UNAUTHORISED_WRITE } from 'helpers/constants';

export default function requestVerificationEmail(req) {
  const reqSecured = reqSecure(req, authAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(user => {
      if (user) {
        sendEmailVerificationEmail(user);
        resolve('Verification email resent');
      } else {
        reject(UNAUTHORISED_WRITE);
      }
    });
  });
}
