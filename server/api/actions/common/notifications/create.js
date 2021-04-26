import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbCreate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import reqSecure from 'server-utils/common/reqSecure';

export default function create(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return lockPromise('notifications', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbCreate({ redisKey: 'notifications', user }, req);
      }
      throw UNAUTHORISED_WRITE;
    })
  );
}
