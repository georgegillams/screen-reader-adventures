import { datumLoadSingle } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadLatest(req) {
  const reqSecured = reqSecure(req, []);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoadSingle({
              redisKey: 'blogs',
              includeDeleted: true,
              filter: ar => ar.id === reqSecured.query.id,
            }),
          );
        } else {
          resolve(
            datumLoadSingle({
              redisKey: 'blogs',
              filter: ar => ar.published && ar.id === reqSecured.query.id,
            }),
          );
        }
      },
      err => reject(err),
    );
  });
}
