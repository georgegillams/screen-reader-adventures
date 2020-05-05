import { datumLoad, datumUpdate } from '../datum';

import lockPromise from 'utils/lock';
import { INVALID_SESSION } from 'helpers/constants';
import getContentLastUpdatedTimestamp from 'utils/getContentLastUpdatedTimestamp';
import { find } from 'utils/find';

export default function keepalive(req) {
  return lockPromise(
    'sessions',
    () =>
      new Promise((resolve, reject) => {
        datumLoad({ redisKey: 'sessions' }).then(sessionData => {
          const { existingValue: session } = find(
            sessionData,
            req.cookies.session,
            'sessionKey',
          );
          if (session) {
            session.lastActive = Date.now();
            datumUpdate({ redisKey: 'sessions' }, { body: session });
          } else {
            reject(INVALID_SESSION);
          }
          resolve(getContentLastUpdatedTimestamp());
        });
      }),
  );
}
