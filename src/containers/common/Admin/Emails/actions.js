import { createRoutine } from 'redux-saga-routines';

import { LOAD, RESEND } from './constants';

export const load = createRoutine(LOAD);
export const resend = createRoutine(RESEND);
