import { URLSearchParams } from 'url';

import fetch from 'node-fetch';

import { authMonzo, loadPotData, formatTransaction } from './private/helpers';
import POT_CONFIGS from './private/potConfigs';

function loadLatestTransactions(req) {
  return new Promise((resolve, reject) => {
    authMonzo(req.body.password).then(
      authResult => {
        if (authResult.error || authResult.warning) {
          resolve(authResult);
          return;
        }
        loadPotData(req.body.password).then(
          potData => {
            if (potData.error || potData.warning) {
              resolve(potData);
              return;
            }

            fetch('https://api.monzo.com/accounts', {
              method: 'get',
              headers: {
                Authorization: `Bearer ${authResult.accessToken.key}`,
              },
            })
              .then(res => res.json())
              .then(
                accountData => {
                  const accountID = accountData.accounts.find(
                    a => a.type === 'uk_retail',
                  ).id;

                  const params = new URLSearchParams();
                  params.append('account_id', accountID);

                  const potConfigsAnnotated = POT_CONFIGS.map(pc => {
                    const pot = potData.find(
                      p => p.name === pc.name && !p.deleted,
                    );
                    if (!pot) {
                      return pc;
                    }
                    const potId = pot.id;
                    return {
                      ...pc,
                      potId,
                    };
                  });
                  fetch(
                    `https://api.monzo.com/transactions?${params.toString()}`,
                    {
                      method: 'GET',
                      headers: {
                        Authorization: `Bearer ${authResult.accessToken.key}`,
                      },
                    },
                  )
                    .then(res => res.json())
                    .then(
                      transactionData => {
                        let potTransfers = [];
                        if (
                          transactionData &&
                          transactionData.transactions &&
                          transactionData.transactions.filter
                        ) {
                          potTransfers = transactionData.transactions.filter(
                            t => {
                              let potOfInterest = false;
                              potConfigsAnnotated.forEach(pc => {
                                if (pc.potId === t.metadata.pot_id) {
                                  potOfInterest = true;
                                }
                              });
                              return (
                                t.scheme === 'uk_retail_pot' && potOfInterest
                              );
                            },
                          );
                          potTransfers = potTransfers.reverse().map(p => {
                            const potName = potConfigsAnnotated.find(
                              pc => pc.potId === p.metadata.pot_id,
                            ).name;
                            return {
                              amount: p.amount,
                              potName,
                              created: p.created,
                            };
                          });
                        }
                        const potWithdrawals = potTransfers.filter(
                          pt => pt.amount > 0,
                        );
                        const potDeposits = potTransfers.filter(
                          pt => pt.amount < 0,
                        );
                        const processedData = POT_CONFIGS.map(pc => {
                          const matchingWithdrawal = potWithdrawals.find(
                            pw => pw.potName === pc.name,
                          );
                          const matchingDeposit = potDeposits.find(
                            pw => pw.potName === pc.name,
                          );
                          return {
                            name: pc.name,
                            lastDeposit: formatTransaction(matchingDeposit),
                            lastWithdrawal: formatTransaction(
                              matchingWithdrawal,
                            ),
                          };
                        });
                        resolve(processedData);
                      },
                      err => reject(err),
                    );
                },
                err => reject(err),
              );
          },
          err => reject(err),
        );
      },
      err => reject(err),
    );
  });
}

export default loadLatestTransactions;
