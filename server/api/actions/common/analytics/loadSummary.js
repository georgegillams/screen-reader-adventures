import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';
import processAnalytics from './private/processAnalytics';

import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

export default function loadSummary(req) {
  reqSecure(req, analyticsAllowedAttributes);
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return dbLoad({
          redisKey: 'analytics',
          includeOwnerUname: true,
          includeDeleted: true,
        });
      }
      throw UNAUTHORISED_READ;
    })
    .then(result => {
      const bags = processAnalytics(result);
      const sortedBags = bags.sort((a, b) => b.count - a.count);
      return { analytics: sortedBags };
    });
}
