import { STRING_REGEX } from 'helpers/regexConstants';
import appConfig from 'helpers/appConfig';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import redis from 'utils/redis';
import { InvalidInputError } from 'utils/errors';
import authentication from 'utils/authentication';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

const deleteSetAllowedAttributes = [
  { attribute: 'collectionName', pattern: STRING_REGEX },
];

export default function deleteSet(req) {
  reqSecure(req, deleteSetAllowedAttributes);
  return authentication(req)
    .then(user => {
      if (!user || !user.admin) {
        throw UNAUTHORISED_WRITE;
      }
      const { collectionName } = req.body;
      if (!collectionName) {
        throw new InvalidInputError('collectionName must be provided');
      } else {
        redis.del(`${appConfig.projectName}_${collectionName}`);
        return setContentLastUpdatedTimestamp();
      }
    })
    .then(() => true);
}
