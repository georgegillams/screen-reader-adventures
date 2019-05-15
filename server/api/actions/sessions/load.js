import { datumLoad } from '../datum';
import authentication from 'utils/authentication';

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumLoad({ redisKey: 'sessions' }));
        } else {
          reject({
            error: 'authentication',
            reason: 'You are not authorised to read this resource',
          });
        }
      },
      err => reject(err),
    );
  });
}
