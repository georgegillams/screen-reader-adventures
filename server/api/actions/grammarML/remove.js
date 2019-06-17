import { datumRemove } from '../datum';

import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  const reqSecured = reqSecure(req, grammarMLAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(datumRemove({ redisKey: 'grammarML' }, reqSecured));
      },
      err => reject(err),
    );
  });
}
