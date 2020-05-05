import { datumLoad, datumCreate, datumUpdate } from '../actions/datum';
import lockPromise from 'utils/lock';

export default function setContentLastUpdatedTimestamp() {
  let newContentUpdateData = {};
  lockPromise('contentUpdates', () =>
    datumLoad({ redisKey: 'contentUpdates' }).then(contentUpdateData => {
      if (contentUpdateData && contentUpdateData.length > 0) {
        newContentUpdateData = contentUpdateData[0];
        newContentUpdateData.lastUpdatedTimestamp = Date.now().toString();
        datumUpdate(
          { redisKey: 'contentUpdates' },
          { body: newContentUpdateData },
        );
      } else {
        datumCreate(
          { redisKey: 'contentUpdates' },
          { body: { lastUpdatedTimestamp: Date.now() } },
        );
      }
    }),
  );
}
