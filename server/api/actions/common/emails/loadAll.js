import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

export default function loadAll(req) {
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return dbLoad({
          redisKey: 'emails',
          includeDeleted: true,
        });
      }
      throw UNAUTHORISED_READ;
    })
    .then(result => ({ emails: result.reverse() }));
}
