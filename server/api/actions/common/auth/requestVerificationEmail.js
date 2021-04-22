import sendEmailVerificationEmail from './private/sendEmailVerificationEmail';
import authAllowedAttributes from './private/authAllowedAttributes';

import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

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
