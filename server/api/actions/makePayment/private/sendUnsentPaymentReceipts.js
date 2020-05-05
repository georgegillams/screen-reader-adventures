import { datumLoad, datumLoadSingle, datumUpdate } from '../../datum';
import { sendPaymentReceiptEmail } from 'utils/emailHelpers';
import fetchPaymentDataFromStripe from './fetchPaymentDataFromStripe';

const markStripePaymentEmailSent = (id, newValue) =>
  new Promise((resolve, reject) => {
    datumLoadSingle({
      redisKey: 'stripepayments',
      filter: sp => sp.id === id,
    })
      .then(stripepayment => {
        resolve(
          datumUpdate(
            { redisKey: 'stripepayments' },
            { body: { ...stripepayment, emailSent: newValue } },
          ),
        );
      })
      .catch(err => {
        reject(err);
      });
  });

export default function sendUnsentPaymentReceipts(payment) {
  return new Promise((resolve, reject) => {
    datumLoad({
      redisKey: 'stripepayments',
      filter: sp => sp.paymentId === payment.id && !sp.emailSent,
    })
      .then(stripePayments => {
        fetchPaymentDataFromStripe(stripePayments)
          .then(paymentIntents => {
            const sendEmailPromises = [];

            paymentIntents.forEach(pI => {
              if (pI) {
                let emailSentNewValue = true;
                pI.charges.data.forEach(pICD => {
                  if (pICD.amount > 0) {
                    emailSentNewValue = sendPaymentReceiptEmail(payment, pICD);
                  }
                });
                sendEmailPromises.push(
                  markStripePaymentEmailSent(
                    pI.stripepayment.id,
                    emailSentNewValue,
                  ),
                );
              }
            });

            Promise.all(sendEmailPromises)
              .then(() => {
                resolve();
              })
              .catch(err => {
                reject(err);
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
