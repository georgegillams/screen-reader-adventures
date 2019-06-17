import { datumLoad, datumUpdate } from '../actions/datum';

import { STRING_REGEX, ID_REGEX, RESOURCE_NOT_FOUND } from 'helpers/constants';
import redis from 'utils/redis';
import { find } from 'utils/find';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import authentication from 'utils/authentication';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

const deleteEntityAllowedAttributes = [
  { attribute: 'collectionName', pattern: STRING_REGEX },
  { attribute: 'id', pattern: ID_REGEX },
];

export default function deleteEntity(req) {
  const reqSecured = reqSecure(req, deleteEntityAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          const { collectionName, id } = reqSecured.body;
          datumLoad({ redisKey: collectionName, includeDeleted: true }).then(
            collectionData => {
              const { existingValue, existingValueIndex } = find(
                collectionData,
                id,
              );
              if (existingValue) {
                if (existingValue.deleted) {
                  console.log(
                    `Permanently removing ${existingValue.id} at index ${existingValueIndex}`,
                  );
                  resolve(
                    redis.lrem(
                      collectionName,
                      1,
                      JSON.stringify(existingValue),
                    ),
                  );
                  setContentLastUpdatedTimestamp();
                } else {
                  resolve({
                    error: 'Only deleted entities can be permanently removed.',
                  });
                }
              } else {
                reject(RESOURCE_NOT_FOUND);
              }
            },
          );
        } else {
          resolve(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
