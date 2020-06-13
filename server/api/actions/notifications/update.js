import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbUpdate } from 'utils/database';
import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return lockPromise('notifications', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbUpdate({ redisKey: 'notifications' }, req);
      }
      throw UNAUTHORISED_WRITE;
    }),
  );
}
