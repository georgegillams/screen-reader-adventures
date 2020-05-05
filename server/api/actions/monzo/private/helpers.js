import safeCompare from 'safe-compare';
import fetch from 'node-fetch';
import moment from 'moment';

import { datumLoadSingle } from '../../datum';
import { getTimeDifference } from 'helpers/time';

import POT_CONFIGS from './potConfigs';

function formatTransaction(transaction) {
  if (!transaction) {
    return null;
  }

  return {
    amount: Math.abs(transaction.amount),
    time: getTimeDifference(transaction.created),
  };
}

function getMonthsElapsedPercentage(potConfig) {
  if (potConfig.monthly) {
    return 0;
  }

  const config = POT_CONFIGS.filter(p => p.name === potConfig.name)[0];

  const result = moment().diff(config.startDate, 'months');
  return Math.min(100, (result * 100) / 12);
}

function authMonzo(password) {
  return new Promise((resolve, reject) => {
    datumLoadSingle({
      redisKey: 'monzoApiKeys',
      resolveIfNotFound: true,
      sortKey: 'lastUpdatedTimestamp',
    }).then(accessToken => {
      const accessPassword = process.env.MONZO_ACCESS_PASSWORD;

      if (!accessToken) {
        reject({
          error: 'auth',
          errorMessage: 'No access token configured',
        });
        return;
      }

      if (!password || !safeCompare(password, accessPassword)) {
        reject({
          error: 'auth',
          errorMessage: 'Access password incorrect.',
        });
        return;
      }

      fetch('https://api.monzo.com/pots', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken.key}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (!data || !data.pots) {
            resolve({
              error: 'auth',
              errorMessage:
                'The Monzo token has expired. Tell George to generate a new one.',
            });
            return;
          }
          resolve({ accessToken });
        });
    });
  });
}

function loadPotData(password) {
  return new Promise((resolve, reject) => {
    authMonzo(password).then(
      authResult => {
        if (authResult.error || authResult.warning) {
          resolve(authResult);
          return;
        }

        fetch('https://api.monzo.com/pots', {
          method: 'get',
          headers: {
            Authorization: `Bearer ${authResult.accessToken.key}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            if (!data || !data.pots) {
              reject({
                error: 'auth',
                errorMessage:
                  'The Monzo token has expired. Tell George to generate a new one.',
              });
              return;
            }
            resolve(data.pots);
          });
      },
      err => reject(err),
    );
  });
}

export default authMonzo;
export {
  loadPotData,
  getMonthsElapsedPercentage,
  authMonzo,
  formatTransaction,
};
