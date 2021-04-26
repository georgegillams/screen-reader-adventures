import sendMagicLinkEmail from './private/sendMagicLinkEmail';
import magicLinksAllowedAttributes from './private/magicLinksAllowedAttributes';

import { dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
import { find } from 'server-utils/common/find';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default function getmagiclink(req) {
  reqSecure(req, magicLinksAllowedAttributes);
  let authenticatedUser = null;
  return authentication(req)
    .then(user => {
      authenticatedUser = user;
      return dbLoad({ redisKey: 'users' });
    })
    .then(userData => {
      const { existingValue: userProfile } = find(userData, req.body.email.toLowerCase(), 'email');
      if (!userProfile) {
        throw new NotFoundError("We couldn't find a profile matching that email");
      }
      const { divertToAdmin } = req.body;
      if (divertToAdmin && (!authenticatedUser || !authenticatedUser.admin)) {
        throw new AuthError('Only an admin user can request a login link for another user');
      }
      // Sent emails should be stored in a DB so that we can verify this has been called:
      return sendMagicLinkEmail(userProfile, divertToAdmin, req.body.loginRedirect);
    })
    .then(() => ({
      success: 'A magic link has been generated and sent to the email associated with your account',
    }));
}
