import { dbLoad, dbCreate, dbUpdate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';

export default function setContentLastUpdatedTimestamp() {
  let newContentUpdateData = {};
  lockPromise('contentUpdates', () =>
    dbLoad({ redisKey: 'contentUpdates' }).then(contentUpdateData => {
      if (contentUpdateData && contentUpdateData.length > 0) {
        [newContentUpdateData] = contentUpdateData;
        newContentUpdateData.lastUpdatedTimestamp = Date.now().toString();
        return dbUpdate({ redisKey: 'contentUpdates' }, { body: newContentUpdateData });
      }
      return dbCreate({ redisKey: 'contentUpdates' }, { body: { lastUpdatedTimestamp: Date.now() } });
    })
  );
}
