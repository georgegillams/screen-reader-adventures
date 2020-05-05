import { datumCreate } from '../datum';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';

export default function create(req) {
  return lockPromise(
    'support',
    () =>
      new Promise((resolve, reject) => {
        authentication(req).then(
          user => {
            if (user && user.admin) {
              resolve(datumCreate({ redisKey: 'support', user }, req));
            } else {
              reject(UNAUTHORISED_WRITE);
            }
          },
          err => reject(err),
        );
      }),
  );
}
