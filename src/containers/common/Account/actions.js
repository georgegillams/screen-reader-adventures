import { createRoutine } from 'redux-saga-routines';

import { LOGOUT, REQUEST_VERIFICATION_EMAIL } from './constants';

export const logout = createRoutine(LOGOUT);
export const requestVerificationEmail = createRoutine(REQUEST_VERIFICATION_EMAIL);
