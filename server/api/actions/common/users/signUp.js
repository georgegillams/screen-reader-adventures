import loginUser from '../auth/private/login';

import create from './create';
import usersAllowedAttributes from './private/usersAllowedAttributes';

import reqSecure from 'server-utils/common/reqSecure';

export default function signUp(req) {
  reqSecure(req, usersAllowedAttributes);
  let newUser = null;
  return create(req)
    .then(result => {
      newUser = result.newUser;
      return true;
    })
    .then(() => loginUser(newUser))
    .then(sessionKey => ({ ...newUser, session: sessionKey }));
}
