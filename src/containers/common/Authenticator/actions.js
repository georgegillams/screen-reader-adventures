import { createRoutine } from 'redux-saga-routines';

import { LOAD_AUTH, SET_USER } from './constants';

export const loadAuth = createRoutine(LOAD_AUTH);
export const setUser = createRoutine(SET_USER);
