import stripeInstance from './stripe';
import formatStripeError from './formatStripeError';

const getPaymentIntent = paymentIntentId =>
  new Promise((resolve, reject) => {
    if (paymentIntentId) {
      resolve(stripeInstance.paymentIntents.retrieve(paymentIntentId));
    } else {
      resolve(null);
    }
  });

export default function fetchPaymentDataFromStripe(stripePayments) {
  return new Promise((resolve, reject) => {
    const stripePaymentIntentPromises = stripePayments.map(sp => {
      return new Promise((res, rej) => {
        // get paid amount from stripe's server
        getPaymentIntent(sp.paymentIntentId)
          .then(paymentIntent => {
            res({ ...paymentIntent, stripepayment: sp });
          })
          .catch(err => {
            rej(formatStripeError(err));
          });
      });
    });

    Promise.all(stripePaymentIntentPromises)
      .then(stripePaymentIntents => {
        resolve(stripePaymentIntents);
      })
      .catch(err => {
        reject(err);
      });
  });
}
