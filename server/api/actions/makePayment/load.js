import lockPromise from 'utils/lock';
import reqSecure from 'utils/reqSecure';
import loadPayment from './private/loadPayment';
import stripePaymentsAllowedAttributes from './private/stripePaymentsAllowedAttributes';
import getPaymentAndBalance from './private/getPaymentAndBalance';
import sendUnsentPaymentReceipts from './private/sendUnsentPaymentReceipts';

export default function loadSingle(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return lockPromise('stripepayments', () => loadPayment(reqSecured));
}
