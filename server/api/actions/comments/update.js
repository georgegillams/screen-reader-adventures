import { datumUpdate } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  const reqSecured = reqSecure(req, commentsAllowedAttributes);
  return lockPromise(
    'comments',
    () =>
      new Promise((resolve, reject) => {
        authentication(reqSecured).then(
          user => {
            userOwnsResource('comments', reqSecured.body.id, user).then(
              userOwnsResourceResult => {
                // Users should be able to update comments that they own
                if (user && (user.admin || userOwnsResourceResult)) {
                  resolve(datumUpdate({ redisKey: 'comments' }, reqSecured));
                } else {
                  reject(UNAUTHORISED_WRITE);
                }
              },
            );
          },
          err => reject(err),
        );
      }),
  );
}
