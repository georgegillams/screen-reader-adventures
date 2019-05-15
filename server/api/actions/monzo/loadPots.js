import { datumLoad, datumLoadSingle, datumCreate } from '../../actions/datum';
import fetch from 'node-fetch';
import moment from 'moment';

const POTS_REVEAL = [
  'Bills (monthly)',
  'Clothing (monthly)',
  'Emergencies',
  'Exercise extras (monthly)',
  'Extras (monthly)',
  'Gifts',
  'Groceries and transport (monthly)',
  'Season ticket',
  'Software + Subscriptions',
  'Travel',
];

function getMonthsElapsedPercentage() {
  const result = moment().diff(`${moment().format('YYYY')}-01-01`, 'months');
  return Math.min(100, ((result + 1) * 100) / 12);
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

          let reducedData = data.pots.filter(
            pot => !pot.deleted && POTS_REVEAL.includes(pot.name),
          );
          reducedData = reducedData.map(pot => {
            const goalAmount = parseFloat(pot.goal_amount) / 100;
            const balance = parseFloat(pot.balance) / 100;
            const monthsElapsedPercentage = getMonthsElapsedPercentage();
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
          resolve(reducedData);
        });
    });
  });
}

export default loadPots;
