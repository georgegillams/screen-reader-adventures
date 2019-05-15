import { datumLoad } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import commentsAllowedAttributes from './commentsAllowedAttributes';

export default function load(req) {
  const reqSecured = reqSecure(req, commentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(
          datumLoad({
            redisKey: 'comments',
            includeOwnerUname: true,
            includeDeleted: user && user.admin,
            filter: reqSecured.query.pageId
              ? comment => comment.pageId === reqSecured.query.pageId
              : null,
          }),
        );
      },
      err => reject(err),
    );
  });
}
