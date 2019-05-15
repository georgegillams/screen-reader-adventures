import { datumUpdate } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';

export default function update(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumUpdate({ redisKey: 'blogs' }, req));
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
