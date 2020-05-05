import { datumUpdate } from '../datum';

import userDetailsAllowedAttributes from './private/userDetailsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  const reqSecured = reqSecure(req, userDetailsAllowedAttributes);
  return lockPromise(
    'userDetails',
    () =>
      new Promise((resolve, reject) => {
        authentication(reqSecured).then(
          user => {
            userOwnsResource('userDetails', reqSecured.body.id, user).then(
              userOwnsResourceResult => {
                // Users should be able to update userDetails that they own
                if (user && (user.admin || userOwnsResourceResult)) {
                  resolve(datumUpdate({ redisKey: 'userDetails' }, reqSecured));
                } else {
                  resolve(UNAUTHORISED_WRITE);
                }
              },
            );
          },
          err => reject(err),
        );
      }),
  );
}
