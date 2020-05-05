import { PROJECT_NAME } from 'helpers/constants';
import redis from 'utils/redis';

export default function performRestoration(data) {
  return new Promise((resolve, reject) => {
    const promises = [];
    Object.keys(data).forEach(key => {
      promises.push(
        new Promise((res, rej) => {
          redis.del(key); // This line is legacy
          redis.del(`${PROJECT_NAME}_${key}`);
          if (data[key].length > 0) {
            const newData = data[key].map(d => {
              return JSON.stringify(d);
            });
            redis.rpush([`${PROJECT_NAME}_${key}`, ...newData]);
          }
          res(true);
        }),
      );
    });
    Promise.all(promises).then(() => {
      resolve(true);
    });
  });
}
