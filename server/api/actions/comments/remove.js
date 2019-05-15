import { datumRemove } from '../datum';
import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import commentsAllowedAttributes from './commentsAllowedAttributes';

export default function remove(req) {
  const reqSecured = reqSecure(req, commentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        userOwnsResource('comments', reqSecured.body.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to delete comments that they own
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(datumRemove({ redisKey: 'comments' }, reqSecured));
            } else {
              reject(UNAUTHORISED_WRITE);
            }
          },
        );
      },
      err => reject(err),
    );
  });
}
