import { datumLoad } from '../actions/datum';

import usersAllowedAttributes from './users/usersAllowedAttributes';

import { find } from 'utils/find';
import authentication from 'utils/authentication';
import { sendMagicLinkEmail } from 'utils/emailHelpers';
import reqSecure from 'utils/reqSecure';

export default function getmagiclink(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise(resolve => {
    authentication(req).then(user => {
      datumLoad({ redisKey: 'users' }).then(userData => {
        const { existingValue: userProfile } = find(
          userData,
          reqSecured.body.email.toLowerCase(),
          'email',
        );
        if (userProfile) {
          const divertToAdmin =
            user && user.admin && reqSecured.body.divertToAdmin;
          sendMagicLinkEmail(
            userProfile,
            divertToAdmin,
            reqSecured.body.loginRedirect,
          );
        }
        resolve({
          success:
            'A magic link has been generated and sent to the email associated with your account',
        });
      });
    });
  });
}
