import { datumLoad } from '../datum';

import authentication from 'utils/authentication';
import { UNAUTHORISED_READ } from 'helpers/constants';

export default function loadAll(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoad({
              redisKey: 'tickets',
              sortKey: 'publishedTimestamp',
              includeDeleted: true,
            }),
          );
        } else {
          resolve(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
