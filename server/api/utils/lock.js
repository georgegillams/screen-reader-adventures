import AsyncLock from 'async-lock';

const lock = new AsyncLock();

const lockPromise = (keys, thunkedPromise) => {
  return new Promise((resolve, reject) => {
    lock
      .acquire(
        keys,
        done => {
          // return value or promise
          thunkedPromise()
            .then(result => {
              resolve(result);
              done();
            })
            .catch(err => {
              reject(err);
              done();
            });
        },
        {},
      )
      .then(() => {
        // lock released
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default lockPromise;
