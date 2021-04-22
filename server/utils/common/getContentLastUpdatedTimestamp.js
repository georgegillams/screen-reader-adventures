import { dbLoad } from 'server-utils/common/database';

export default function getContentLastUpdatedTimestamp() {
  return dbLoad({ redisKey: 'contentUpdates' }).then(contentUpdateData => {
    if (contentUpdateData && contentUpdateData.length > 0) {
      // In the interest of reducing traffic, only send the raw timestamp value
      return contentUpdateData[0].lastUpdatedTimestamp;
    }
    return 1;
  });
}
