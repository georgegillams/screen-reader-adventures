import { datumLoad } from '../actions/datum';

import { find } from './find';

const secretApiKey = process.env.SECRET_API_KEY;

export default function authentication(req) {
  return new Promise(resolve => {
    const sessionKey = req.cookies.session;
    const apiKey = req.headers.apikey;
    if (apiKey && apiKey === secretApiKey) {
      resolve({
        id: 'direct_API_invocator',
        admin: true,
        uname: 'direct_API_invocation',
      });
    } else if (sessionKey) {
      // Using datum load as we want to avoid invoking authentication when loading users data here
      datumLoad({ redisKey: 'users' }).then(userData => {
        datumLoad({ redisKey: 'sessions' }).then(sessionData => {
          const { existingValue: userSession } = find(
            sessionData,
            sessionKey,
            'sessionKey',
          );
          if (userSession) {
            const { existingValue: userProfile } = find(
              userData,
              userSession.userId,
            );
            if (userProfile) {
              resolve(userProfile);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });
      });
    } else {
      resolve(null);
    }
  });
}
