import { loadPotData, getMonthsElapsedPercentage } from './helpers';
import POT_CONFIGS from './potConfigs';

function loadPots(req) {
  return new Promise(resolve => {
    loadPotData(req.body.password).then(potData => {
      if (potData.error || potData.warning) {
        resolve(potData);
        return;
      }
      const processedData = POT_CONFIGS.map(potConfig => {
        const pot = potData.filter(
          p => p.name === potConfig.name && !p.deleted,
        )[0];
        if (!pot) {
          resolve({ error: 'An unknown error occured' });
          return null;
        }

        const goalAmount = parseFloat(pot.goal_amount) / 100;
        const balance = parseFloat(pot.balance) / 100;
        const monthsElapsedPercentage = getMonthsElapsedPercentage(pot.name);
        const expectedSavingsSoFar =
          (potConfig.startAmount || 0) +
          (goalAmount * monthsElapsedPercentage) / 100;
        const shortfall = expectedSavingsSoFar - balance;
        return {
          name: pot.name,
          balance,
          goalAmount: parseFloat(pot.goal_amount) / 100,
          percentageExpected: (100.0 * expectedSavingsSoFar) / goalAmount,
          shortfall: shortfall < 5 ? null : shortfall,
          percentageComplete: pot.goal_amount
            ? Math.ceil((100 * pot.balance) / pot.goal_amount)
            : 100,
        };
      });
      resolve(processedData);
    });
  });
}

export default loadPots;
