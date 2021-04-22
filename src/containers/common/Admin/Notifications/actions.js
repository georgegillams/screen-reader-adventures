import { createRoutine } from 'redux-saga-routines';

import { LOAD, CREATE, REMOVE } from './constants';

export const load = createRoutine(LOAD);
export const create = createRoutine(CREATE);
export const remove = createRoutine(REMOVE);
