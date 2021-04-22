import { STRING_REGEX } from 'helpers/regexConstants';
import appConfig from 'helpers/appConfig';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import redis from 'server-utils/common/redis';
import { InvalidInputError } from 'server-utils/common/errors';
import authentication from 'server-utils/common/authentication';
import setContentLastUpdatedTimestamp from 'server-utils/common/setContentLastUpdatedTimestamp';
import reqSecure from 'server-utils/common/reqSecure';

const deleteSetAllowedAttributes = [{ attribute: 'collectionName', pattern: STRING_REGEX }];

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
