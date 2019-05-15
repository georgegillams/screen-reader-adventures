import { datumLoad, datumUpdate } from '../actions/datum';
import { find } from 'utils/find';
import reqSecure from 'utils/reqSecure';
import usersAllowedAttributes from './users/usersAllowedAttributes';
import loginUser from 'utils/login';

export default function loginmagiclink(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    const { magicLinkKey } = reqSecured.body;
    datumLoad({ redisKey: 'magiclinks' }).then(magicLinkData => {
      datumLoad({ redisKey: 'users' }).then(userData => {
        const { existingValue: magicLink } = find(
          magicLinkData,
          magicLinkKey,
          'key',
        );
        if (magicLink) {
          const { existingValue: user } = find(userData, magicLink.userId);
          if (Date.now() < new Date(magicLink.expiry).getTime()) {
            // invalidate magic link (set expiry to 0)
            magicLink.expiry = 0;
            datumUpdate({ redisKey: 'magiclinks' }, { body: magicLink });
            resolve(loginUser(reqSecured, user));
          } else {
            resolve({ error: 'Magic link has expired' });
          }
        } else {
          resolve({ error: 'Invalid magic link' });
        }
      });
    });
  });
}
