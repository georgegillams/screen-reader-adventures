import { createRoutine } from 'redux-saga-routines';

import { SEND_ANALYTIC } from './constants';

export const sendAnalytic = createRoutine(SEND_ANALYTIC);
