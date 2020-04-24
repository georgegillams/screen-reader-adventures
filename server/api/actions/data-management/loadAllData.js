import { REDIS_INFORMATION_STORES } from 'helpers/constants';
import { datumLoad } from '../datum';

export default function loadAllData() {
  return new Promise((resolve, reject) => {
    const data = {};
    const loadPromises = [];
    REDIS_INFORMATION_STORES.forEach(redisKey => {
      loadPromises.push(
        new Promise(res => {
          datumLoad({
            redisKey: redisKey,
            includeDeleted: true,
          }).then(loadedData => {
            data[redisKey] = loadedData;
            res();
          });
        }),
      );
    });
    Promise.all(loadPromises).then(() => {
      resolve(data);
    });
  });
}
