import { datumLoad } from '../datum';

import authentication from 'utils/authentication';

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoad({
            redisKey: 'support',
            sortKey: 'lastUpdatedTimestamp',
          }),
        );
      },
      err => reject(err),
    );
  });
}
