import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbLoadSingle } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default function loadSingle(req, params) {
  reqSecure(req, notificationsAllowedAttributes);
  return authentication(req).then(user =>
    dbLoadSingle({
      redisKey: 'notifications',
      includeDeleted: user && user.admin,
      filter: ar => ar.id === params.id,
    })
  );
}
