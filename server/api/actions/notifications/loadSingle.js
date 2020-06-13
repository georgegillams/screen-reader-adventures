import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbLoadSingle } from 'utils/database';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadSingle(req, params) {
  reqSecure(req, notificationsAllowedAttributes);
  return authentication(req).then(user =>
    dbLoadSingle({
      redisKey: 'notifications',
      includeDeleted: user && user.admin,
      filter: ar => ar.id === params.id,
    }),
  );
}
