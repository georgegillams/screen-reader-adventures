import { datumLoadSingle } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import commentsAllowedAttributes from './commentsAllowedAttributes';

export default function loadSingle(req) {
  const reqSecured = reqSecure(req, commentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoadSingle({
              redisKey: 'comments',
              includeDeleted: true,
              filter: ar => ar.id === reqSecured.query.id,
            }),
          );
        } else {
          resolve(
            datumLoadSingle({
              redisKey: 'comments',
              filter: ar => ar.id === reqSecured.query.id,
            }),
          );
        }
      },
      err => reject(err),
    );
  });
}
