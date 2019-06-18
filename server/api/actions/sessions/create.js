import crypto from 'crypto';

import { datumCreate } from '../datum';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { generateKey } from 'utils/hash';

export default function create(req) {
  const reqSecured = reqSecure(req, []);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        reqSecured.body.sessionKey = generateKey();
        reqSecured.body.lastActive = Date.now();
        resolve(datumCreate({ redisKey: 'sessions', user }, reqSecured));
      },
      err => reject(err),
    );
  });
}
