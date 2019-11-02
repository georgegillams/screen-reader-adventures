import fetch from 'node-fetch';
import moment from 'moment';

import { datumLoadSingle } from '../../actions/datum';
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

function getMonthsElapsedPercentage(potName) {
  if (
    potName.includes('(monthly)') ||
    potName === 'Weekly' ||
    potName === 'Leftover'
  ) {
    return 0;
  }

  const config = POT_CONFIGS.filter(p => p.name === potName)[0];

  const result = moment().diff(config.startDate, 'months');
  return Math.min(100, (result * 100) / 12);
}

function authMonzo(password) {
  return new Promise(resolve => {
    datumLoadSingle({
      redisKey: 'monzoApiKeys',
      resolveIfNotFound: true,
      sortKey: 'lastUpdatedTimestamp',
    }).then(accessToken => {
      const accessPassword = process.env.MONZO_ACCESS_PASSWORD;

      if (!accessToken) {
        resolve({
          error: 'No access token configured',
        });
        return;
      }

      if (!password || password !== accessPassword) {
        resolve({
          warning: 'Access password incorrect.',
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
              error:
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
  return new Promise(resolve => {
    authMonzo(password).then(authResult => {
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
            resolve({
              error:
                'The Monzo token has expired. Tell George to generate a new one.',
            });
            return;
          }
          resolve(data.pots);
        });
    });
  });
}

export default authMonzo;
export {
  loadPotData,
  getMonthsElapsedPercentage,
  authMonzo,
  formatTransaction,
};
