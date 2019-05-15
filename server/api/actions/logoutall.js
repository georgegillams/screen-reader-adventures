import { datumLoad, datumUpdate } from '../actions/datum';
import authentication from 'utils/authentication';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';
import usersAllowedAttributes from './users/usersAllowedAttributes';

export default function logoutall(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise(resolve => {
    authentication(reqSecured).then(user => {
      if (user) {
        datumLoad({ redisKey: 'sessions' }).then(sessionData => {
          for (let it = 0; it < sessionData.length; it += 1) {
            const session = sessionData[it];
            if (session.userId === user.id) {
              session.userId = null;
              session.userAuthenticatedTimestamp = null;
              resolve(datumUpdate({ redisKey: 'sessions' }, { body: session }));
              setContentLastUpdatedTimestamp();
            }
          }
        });
      }
    });
  });
}
