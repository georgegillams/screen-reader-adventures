import { datumLoad, datumUpdate } from '../datum';

import authAllowedAttributes from './private/authAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

export default function logoutall(req) {
  const reqSecured = reqSecure(req, authAllowedAttributes);
  return lockPromise(
    'sessions',
    () =>
      new Promise(resolve => {
        authentication(reqSecured).then(user => {
          if (user) {
            datumLoad({ redisKey: 'sessions' }).then(sessionData => {
              for (let it = 0; it < sessionData.length; it += 1) {
                const session = sessionData[it];
                if (session.userId === user.id) {
                  session.userId = null;
                  session.userAuthenticatedTimestamp = null;
                  resolve(
                    datumUpdate({ redisKey: 'sessions' }, { body: session }),
                  );
                  setContentLastUpdatedTimestamp();
                }
              }
            });
          }
        });
      }),
  );
}
