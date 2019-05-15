import { datumCreate } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import { validateType } from 'helpers/ticketing';

export default function create(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          if (validateType(req.body.ticketType)) {
            resolve(datumCreate({ redisKey: 'tickets', user }, req));
          } else {
            resolve({ error: 'Invalid ticket type' });
          }
        } else {
          resolve(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
