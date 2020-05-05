import { datumRemove } from '../datum';

import userDetailsAllowedAttributes from './private/userDetailsAllowedAttributes';

import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  const reqSecured = reqSecure(req, userDetailsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        userOwnsResource('userDetails', reqSecured.body.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to delete userDetails that they own
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(datumRemove({ redisKey: 'userDetails' }, reqSecured));
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
