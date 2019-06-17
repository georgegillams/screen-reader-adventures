import { datumLoad, datumCreate } from '../actions/datum';

import { find } from 'utils/find';
import { INVALID_SESSION, INVALID_CREDENTIALS } from 'helpers/constants';
import { generateKey } from 'utils/hash';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';

export default function login(reqSecured, userProfile) {
  return new Promise((resolve, reject) => {
    datumLoad({ redisKey: 'sessions' }).then(sessionData => {
      const session = {};
      session.sessionKey = generateKey();
      session.userId = userProfile.id;
      userProfile.session = session.sessionKey;
      session.userAuthenticatedTimestamp = Date.now();
      datumCreate({ redisKey: 'sessions' }, { body: session }).then(() => {
        setContentLastUpdatedTimestamp();
        resolve(userProfile);
      });
    });
  });
}
