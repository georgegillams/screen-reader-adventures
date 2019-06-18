import usersAllowedAttributes from './users/usersAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadAuth(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise(resolve => {
    authentication(reqSecured).then(user => {
      if (user) {
        user.emailFingerprint = null;
        user.hash = null;
      }
      resolve(user);
    });
  });
}
