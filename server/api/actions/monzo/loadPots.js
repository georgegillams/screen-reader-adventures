import fetch from 'node-fetch';
import moment from 'moment';

import { datumLoad, datumLoadSingle, datumCreate } from '../../actions/datum';

const thisYear = moment().format('YYYY');
const lastYear = thisYear - 1;

const POT_CONFIGS = [
  {
    name: 'Season ticket',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Holiday',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Emergencies',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Gifts',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Charlie',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Extras',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Subscriptions (yearly) - Dropbox, Todoist and Domains',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Dentist and prescriptions',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Buffer',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Aerial (monthly)',
  },
  {
    name: 'Weekly',
  },
  {
    name: 'Leftover',
  },
];

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

function loadPots(req) {
  return new Promise(resolve => {
    datumLoadSingle({
      redisKey: 'monzoApiKeys',
      resolveIfNotFound: true,
      sortKey: 'lastUpdatedTimestamp',
    }).then(accessToken => {
      const accessPassword = process.env.MONZO_ACCESS_PASSWORD;

      if (!accessToken) {
        resolve({ error: 'No access token configured' });
        return;
      }

      if (!req.body.password || req.body.password !== accessPassword) {
        resolve({ warning: 'Access password incorrect' });
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

          const processedData = POT_CONFIGS.map(potConfig => {
            const pot = data.pots.filter(
              p => p.name === potConfig.name && !p.deleted,
            )[0];
            if (!pot) {
              return null;
            }

            const goalAmount = parseFloat(pot.goal_amount) / 100;
            const balance = parseFloat(pot.balance) / 100;
            const monthsElapsedPercentage = getMonthsElapsedPercentage(
              pot.name,
            );
            const expectedSavingsSoFar =
              (goalAmount * monthsElapsedPercentage) / 100;
            const shortfall = expectedSavingsSoFar - balance;
            return {
              name: pot.name,
              balance,
              goalAmount: parseFloat(pot.goal_amount) / 100,
              percentageTimeElapsed: monthsElapsedPercentage,
              shortfall: shortfall < 5 ? null : shortfall,
              percentageComplete: pot.goal_amount
                ? Math.ceil((100 * pot.balance) / pot.goal_amount)
                : 100,
            };
          });
          resolve(processedData);
        });
    });
  });
}

export default loadPots;
