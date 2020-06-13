import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbRemove } from 'utils/database';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return authentication(req).then(user => {
    if (user && user.admin) {
      return dbRemove({ redisKey: 'notifications' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
