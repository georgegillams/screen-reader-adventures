import { datumLoadSingle } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadLatest(req) {
  const reqSecured = reqSecure(req, []);
  return new Promise((resolve, reject) => {
    resolve(
      datumLoadSingle({
        redisKey: 'gts',
        sortKey: 'lastUpdatedTimestamp',
        includeDeleted: false,
      }),
    );
  });
}
