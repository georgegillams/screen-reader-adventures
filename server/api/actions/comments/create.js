import { datumCreate } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import commentsAllowedAttributes from './commentsAllowedAttributes';

export default function create(req) {
  const reqSecured = reqSecure(req, commentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(datumCreate({ redisKey: 'comments', user }, reqSecured));
      },
      err => reject(err),
    );
  });
}
