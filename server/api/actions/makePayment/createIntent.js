import { datumCreate } from '../datum';
import reqSecure from 'utils/reqSecure';
import lockPromise from 'utils/lock';
import loadPayment from './private/loadPayment';
import stripeInstance from './private/stripe';
import formatStripeError from './private/formatStripeError';
import stripePaymentsAllowedAttributes from './private/stripePaymentsAllowedAttributes';

const createNewPaymentIntent = payment =>
  new Promise((resolve, reject) => {
    if (
      payment.outstandingBalance < 30 &&
      payment.outstandingBalance > 1000000
    ) {
      resolve({ id: null, client_secret: null });
    } else {
      resolve(
        stripeInstance.paymentIntents.create({
          amount: payment.outstandingBalance,
          currency: 'gbp',
        }),
      );
    }
  });

export default function createIntent(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return lockPromise(
    'stripepayments',
    () =>
      new Promise((resolve, reject) => {
        loadPayment(reqSecured)
          .then(payment => {
            createNewPaymentIntent(payment)
              .then(paymentIntent => {
                datumCreate(
                  { redisKey: 'stripepayments' },
                  {
                    body: {
                      paymentId: payment.id,
                      paymentIntentId: paymentIntent.id,
                      paymentIntentClientSecret: paymentIntent.client_secret,
                    },
                  },
                )
                  .then(() => {
                    resolve({
                      ...payment,
                      paymentIntentClientSecret: paymentIntent.client_secret,
                    });
                  })
                  .catch(err => {
                    reject(err);
                  });
              })
              .catch(err => {
                reject(formatStripeError(err));
              });
          })
          .catch(err => {
            reject(err);
          });
      }),
  );
}
