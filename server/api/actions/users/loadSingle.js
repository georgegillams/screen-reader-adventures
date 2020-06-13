import { dbLoadSingle } from 'utils/database';
import { UNAUTHORISED_READ } from 'utils/errorConstants';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

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
