import { datumLoadSingle } from '../datum';
import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_READ } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import paymentsAllowedAttributes from './paymentsAllowedAttributes';

export default function loadSingle(req) {
  const reqSecured = reqSecure(req, paymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        userOwnsResource('payments', reqSecured.query.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to delete comments that they own
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(
                datumLoadSingle({
                  redisKey: 'payments',
                  includeDeleted: user && user.admin,
                  filter: ar => ar.id === reqSecured.query.id,
                }),
              );
            } else {
              reject(UNAUTHORISED_READ);
            }
          },
        );
      },
      err => reject(err),
    );
  });
}
