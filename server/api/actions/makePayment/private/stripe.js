import stripe from 'stripe';
import { STRIPE_SECRET_API_KEY } from 'helpers/constants';

const stripeInstance = stripe(STRIPE_SECRET_API_KEY);

export default stripeInstance;
