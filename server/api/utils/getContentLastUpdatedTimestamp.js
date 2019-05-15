import { datumLoad } from '../actions/datum';

export default function getContentLastUpdatedTimestamp() {
  return new Promise(resolve => {
    datumLoad({ redisKey: 'contentUpdates' }).then(contentUpdateData => {
      if (contentUpdateData && contentUpdateData.length > 0) {
        // In the interest of reducing traffic, only send the raw timestamp value
        resolve(contentUpdateData[0].lastUpdatedTimestamp);
      } else {
        resolve(1);
      }
    });
  });
}
