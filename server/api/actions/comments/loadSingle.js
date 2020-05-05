import { datumLoadSingle } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadSingle(req) {
  const reqSecured = reqSecure(req, commentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(
          datumLoadSingle({
            redisKey: 'comments',
            includeDeleted: user && user.admin,
            filter: ar => ar.id === reqSecured.query.id,
          }),
        );
      },
      err => reject(err),
    );
  });
}
