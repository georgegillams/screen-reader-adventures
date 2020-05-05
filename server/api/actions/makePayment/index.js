// Payment concepts:
// payment - a representation of a potential payment, with an amount and email for receipt.
// stripepayment - an intent to make a payment via stripe. Contains the id of the payment, as well as the tokens needed to make a payment to stripe.
// stripepaymentintent - a similar intent, populated with data from Stripe's servers with information about any card payments that have been carried out.

export resendPaymentReceipt from './resendPaymentReceipt';
export load from './load';
export createIntent from './createIntent';
