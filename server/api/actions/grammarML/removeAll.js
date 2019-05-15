import redis from 'utils/redis';
import { datumRemove, datumLoad } from '../datum';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

export default function removeAll(req) {
  const reqSecured = reqSecure(req, grammarMLAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        datumLoad({ redisKey: 'grammarML', includeDeleted: true }).then(
          collectionData => {
            for (let i = 0; i < collectionData.length; i += 1) {
              let existingValue = collectionData[i];
              console.log(
                `Permanently removing ${existingValue.id} at index ${i}`,
              );
              resolve(
                redis.lrem('grammarML', 1, JSON.stringify(existingValue)),
              );
            }
          },
        );
      },
      err => reject(err),
    );
  });
}
