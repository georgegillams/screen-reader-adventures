import { datumLoad, datumUpdate } from '../datum';

import magicLinksAllowedAttributes from './private/magicLinksAllowedAttributes';

import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import reqSecure from 'utils/reqSecure';
import loginUser from 'utils/login';

export default function loginmagiclink(req) {
  const reqSecured = reqSecure(req, magicLinksAllowedAttributes);
  return lockPromise(
    'magiclinks',
    () =>
      new Promise((resolve, reject) => {
        const { magicLinkKey } = reqSecured.body;
        datumLoad({ redisKey: 'magiclinks' }).then(magicLinkData => {
          datumLoad({ redisKey: 'users' }).then(userData => {
            // `find` uses `safeCompare` so it is safe to use for finding the entry that matches the key
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
                reject({
                  error: 'wrong-input',
                  errorMessage: 'Magic link has expired',
                });
              }
            } else {
              reject({
                error: 'wrong-input',
                errorMessage: 'Invalid magic link',
              });
            }
          });
        });
      }),
  );
}
