import safeCompare from 'safe-compare';

import { find } from './find';

import { dbLoad } from 'server-utils/common/database';
import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';

const secretApiKey = process.env.SECRET_API_KEY;

export default function authentication(req) {
  const sessionKey = req.cookies[SESSION_COOKIE_KEY];
  const apiKey = req.headers.apikey;
  let users = null;
  let sessions = null;
  // important to use `safeCompare` here to prevent
  // a timing attack to discover the key
  if (apiKey && safeCompare(apiKey, secretApiKey)) {
    return Promise.resolve().then(() => ({
      id: 'direct_API_invocator',
      admin: true,
      uname: 'direct_API_invocation',
    }));
  }
  if (sessionKey) {
    return Promise.resolve()
      .then(() => dbLoad({ redisKey: 'users' }))
      .then(userData => {
        users = userData;
        return true;
      })
      .then(() => dbLoad({ redisKey: 'sessions' }))
      .then(sessionData => {
        sessions = sessionData;
        return true;
      })
      .then(() => {
        // `find` uses `safeCompare` so it is safe to use for authentication
        const { existingValue: userSession } = find(sessions, sessionKey, 'sessionKey');
        if (userSession && userSession.expiry && userSession.expiry >= Date.now()) {
          // `find` uses `safeCompare` so it is safe to use for authentication
          const { existingValue: userProfile } = find(users, userSession.userId);
          if (userProfile) {
            return userProfile;
          }
          return null;
        }
        return null;
      });
  }
  return Promise.resolve().then(() => null);
}
