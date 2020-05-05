import { datumLoad, datumUpdate } from '../datum';

import authAllowedAttributes from './private/authAllowedAttributes';

import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

export default function logout(req) {
  const reqSecured = reqSecure(req, authAllowedAttributes);
  return lockPromise(
    'sessions',
    () =>
      new Promise((resolve, reject) => {
        datumLoad({ redisKey: 'sessions' }).then(sessionData => {
          const { existingValue: session } = find(
            sessionData,
            reqSecured.cookies.session,
            'sessionKey',
          );
          if (session) {
            session.userId = null;
            session.userAuthenticatedTimestamp = null;
            resolve(datumUpdate({ redisKey: 'sessions' }, { body: session }));
            resolve({ success: 'You are now logged out' });
            setContentLastUpdatedTimestamp();
          } else {
            reject({
              error:
                'Invalid session. Try clearing cookies for this site and then re-authenticate',
            });
          }
        });
      }),
  );
}
