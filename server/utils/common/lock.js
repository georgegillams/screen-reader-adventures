/* eslint-disable promise/no-callback-in-promise */

import AsyncLock from 'async-lock';

const lock = new AsyncLock();

const lockPromise = (keys, thunkedPromise) =>
  new Promise((resolve, reject) => {
    lock
      .acquire(
        keys,
        done => {
          // return value or promise
          thunkedPromise()
            .then(result => {
              resolve(result);
              return done();
            })
            .catch(err => {
              reject(err);
              done();
            });
        },
        {}
      )
      .then(
        () =>
          // lock released
          true
      )
      .catch(err => {
        reject(err);
      });
  });

export default lockPromise;
