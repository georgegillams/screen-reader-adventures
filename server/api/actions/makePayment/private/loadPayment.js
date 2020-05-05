import lockPromise from 'utils/lock';
import getPaymentAndBalance from './getPaymentAndBalance';
import sendUnsentPaymentReceipts from './sendUnsentPaymentReceipts';

export default function loadSingle(reqSecured) {
  return new Promise((resolve, reject) => {
    getPaymentAndBalance(reqSecured.body.paymentId)
      .then(payment => {
        sendUnsentPaymentReceipts(payment)
          .then(() => {
            resolve({
              ...payment,
              email: 'REDACTED',
            });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}
