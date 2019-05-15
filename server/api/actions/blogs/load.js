import { datumLoad } from '../datum';
import authentication from 'utils/authentication';

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoad({
            redisKey: 'blogs',
            sortKey: 'publishedTimestamp',
            includeDeleted: user && user.admin,
            filter: b => b.published || (user && user.admin),
          }),
        );
      },
      err => reject(err),
    );
  });
}
