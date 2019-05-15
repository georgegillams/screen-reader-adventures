import { STRING_REGEX, ID_REGEX, RESOURCE_NOT_FOUND } from 'helpers/constants';
import redis from 'utils/redis';
import { datumLoad, datumUpdate } from '../actions/datum';
import { find } from 'utils/find';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import authentication from 'utils/authentication';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

const deleteSetAllowedAttributes = [
  { attribute: 'collectionName', pattern: STRING_REGEX },
];

export default function deleteSet(req) {
  const reqSecured = reqSecure(req, deleteSetAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          const { collectionName } = reqSecured.body;
          if (!collectionName) {
            resolve({ error: 'CollectionName must be provided' });
          } else {
            datumLoad({ redisKey: collectionName, includeDeleted: true }).then(
              collectionData => {
                for (let i = 0; i < collectionData.length; i += 1) {
                  let existingValue = collectionData[i];
                  console.log(
                    `Permanently removing ${existingValue.id} at index ${i}`,
                  );
                  resolve(
                    redis.lrem(
                      collectionName,
                      1,
                      JSON.stringify(existingValue),
                    ),
                  );
                  setContentLastUpdatedTimestamp();
                }
              },
            );
          }
        } else {
          resolve(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
