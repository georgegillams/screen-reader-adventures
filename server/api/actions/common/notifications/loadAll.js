import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default function loadAll(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return authentication(req)
    .then(user =>
      dbLoad({
        redisKey: 'notifications',
        includeDeleted: user && user.admin,
      })
    )
    .then(notifications => ({ notifications }));
}
