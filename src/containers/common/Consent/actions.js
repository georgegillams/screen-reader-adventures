import { createRoutine } from 'redux-saga-routines';

import { CONSENT, DEFER_CONSENT, SET_CONSENT_REASON, RESET_CONSENT } from './constants';

export const consent = createRoutine(CONSENT);
export const deferConsent = createRoutine(DEFER_CONSENT);
export const setConsentReason = createRoutine(SET_CONSENT_REASON);
export const resetConsent = createRoutine(RESET_CONSENT);
