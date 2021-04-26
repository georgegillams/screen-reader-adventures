import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import { RESOURCE_NOT_FOUND } from '../../../../utils/common/errorConstants';
import { sendEmail } from 'server-utils/emails';
import { find } from 'server-utils/common/find';

export default function resend(req) {
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return dbLoad({
          redisKey: 'emails',
        });
      }
      throw UNAUTHORISED_READ;
    })
    .then(emailData => {
      const { existingValue: matchingEmail } = find(emailData, req.body.id);
      if (!matchingEmail) {
        throw RESOURCE_NOT_FOUND;
      }
      return sendEmail(matchingEmail);
    });
}
