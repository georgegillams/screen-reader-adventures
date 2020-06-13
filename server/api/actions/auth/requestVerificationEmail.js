import sendEmailVerificationEmail from './private/sendEmailVerificationEmail';
import authAllowedAttributes from './private/authAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';

export default function requestVerificationEmail(req) {
  reqSecure(req, authAllowedAttributes);
  return authentication(req)
    .then(user => {
      if (user) {
        return sendEmailVerificationEmail(user);
      }
      throw UNAUTHORISED_WRITE;
    })
    .then(() => ({ success: 'Verification email resent' }));
}
