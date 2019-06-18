import stripe from 'stripe';

import { datumLoad, datumCreate, datumUpdate } from '../datum';

import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import { sendPaymentReceiptEmail } from 'utils/emailHelpers';
import { calculateOutstandingBalance } from 'helpers/ticketing';
import { find } from 'utils/find';

const stripeInstance = stripe(process.env.STRIPE_SECRET_API_KEY);

export default function pay(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        // TODO Get user's ticket
        datumLoad({
          redisKey: 'tickets',
        }).then(ticketData => {
          console.log(`ticketData`);
          const { existingValue: ticket } = find(
            ticketData,
            user.id,
            'reservedTo',
          );
          if (!ticket) {
            console.log(`no ticket`);
            resolve({
              error:
                'No ticket reservation for your account. You can only make payment against a valid reservation.',
            });
          } else if (
            new Date(ticket.reservedUntil).getTime() < new Date().getTime()
          ) {
            console.log(`ticket expired`);
            resolve({
              error:
                'Your reserved ticket has expired. You can only make payment against a valid reservation.',
            });
            return;
          }

          console.log(`ticketFound`, ticket);

          datumLoad({
            redisKey: 'stripepayments',
          }).then(paymentData => {
            const payments = paymentData.filter(p => p.userId === user.id);

            console.log(`usersPayments`, payments);

            const outstandingBalance = calculateOutstandingBalance(
              ticket,
              payments,
            );
            console.log(`outstandingBalance`, outstandingBalance);
            const { paymentToken, paymentAmount } = reqSecured.body;
            console.log(`paymentAmount`, paymentAmount);
            if (outstandingBalance !== paymentAmount) {
              resolve({
                error:
                  "Something's not adding up here, and we don't want to take the wrong amount. Please try again later.",
              });
              return;
            }
            stripeInstance.charges.create(
              {
                amount: outstandingBalance,
                currency: 'gbp',
                source: paymentToken, // obtained with Stripe.js
                description: 'EPICC conference 2019 ticket purchase.',
              },
              (err, charge) => {
                if (err) {
                  resolve({ error: err.message });
                } else {
                  console.log(`charge`, charge);
                  charge.userId = user.id;
                  charge.ticketId = ticket.id;
                  console.log(`charge edited`, charge);
                  ticket.reservedTo = user.id;
                  ticket.reservedUntil = Number.MAX_SAFE_INTEGER;
                  console.log(`ticket edited`, ticket);
                  datumCreate(
                    { redisKey: 'stripepayments', user },
                    { body: charge },
                  ).then(createdPayment => {
                    console.log(`charge written`, createdPayment);
                    datumUpdate({ redisKey: 'tickets' }, { body: ticket }).then(
                      updatedTicket => {
                        console.log(`ticket written`, updatedTicket);
                        sendPaymentReceiptEmail(user, createdPayment);
                        resolve(createdPayment);
                      },
                    );
                  });
                }
              },
            );
          });
        });
      },
      err => reject(err),
    );
  });
}
