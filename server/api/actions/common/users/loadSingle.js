import { dbLoadSingle } from 'server-utils/common/database';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default function loadSingle(req) {
  reqSecure(req, []);
  return authentication(req).then(user => {
    if (user && user.admin) {
      return dbLoadSingle({
        redisKey: 'users',
        filter: ar => ar.id === req.query.id,
      });
    }
    throw UNAUTHORISED_READ;
  });
}
