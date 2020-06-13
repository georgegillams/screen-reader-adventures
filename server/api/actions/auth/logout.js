import authAllowedAttributes from './private/authAllowedAttributes';

import { dbLoad, dbUpdate } from 'utils/database';
import { INVALID_SESSION } from 'utils/errorConstants';
import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

export default function logout(req) {
  reqSecure(req, authAllowedAttributes);
  return lockPromise('sessions', () =>
    dbLoad({ redisKey: 'sessions' })
      .then(sessionData => {
        const { existingValue: session } = find(
          sessionData,
          req.cookies.session,
          'sessionKey',
        );
        if (session) {
          session.userId = null;
          session.userAuthenticatedTimestamp = null;
          return dbUpdate({ redisKey: 'sessions' }, { body: session });
        }
        throw INVALID_SESSION;
      })
      .then(() => setContentLastUpdatedTimestamp())
      .then(() => ({ success: 'You are now logged out' })),
  );
}
