import appConfig from 'helpers/appConfig';
import redis from 'server-utils/common/redis';

/**
 * Overwrites all redis data stores with the data values provided
 * @param {object} data The data object to perform the restoration from
 * @returns {null} none
 */

export default function performRestoration(data) {
  Object.keys(data).forEach(key => {
    redis.del(`${appConfig.projectName}_${key}`);
    if (data[key].length > 0) {
      const newData = data[key].map(d => JSON.stringify(d));
      redis.rpush([`${appConfig.projectName}_${key}`, ...newData]);
    }
  });
}
