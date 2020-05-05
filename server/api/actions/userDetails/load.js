import { datumLoad, datumLoadSingle, datumCreate } from '../datum';

import userDetailsAllowedAttributes from './private/userDetailsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import { find } from 'utils/find';

export default function load(req) {
  const reqSecured = reqSecure(req, userDetailsAllowedAttributes);
  return lockPromise(
    'userDetails',
    () =>
      new Promise((resolve, reject) => {
        authentication(reqSecured).then(
          user => {
            if (user) {
              datumLoadSingle({
                redisKey: 'userDetails',
                includeDeleted: user.admin,
                filter: ud => ud.authorId === user.id,
              }).then(
                loadedUserDetails => {
                  datumLoad({
                    redisKey: 'tickets',
                  }).then(ticketData => {
                    const { existingValue: ticket } = find(
                      ticketData,
                      user.id,
                      'reservedTo',
                    );
                    loadedUserDetails.ticket = ticket;
                    resolve(loadedUserDetails);
                  });
                },
                err => {
                  resolve(
                    datumCreate({ redisKey: 'userDetails', user }, reqSecured),
                  );
                },
              );
            } else {
              resolve(UNAUTHORISED_READ);
            }
          },
          err => reject(err),
        );
      }),
  );
}
