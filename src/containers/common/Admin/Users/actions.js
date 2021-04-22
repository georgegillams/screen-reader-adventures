import { createRoutine } from 'redux-saga-routines';

import { LOAD, REMOVE, REQUEST_MAGIC_LINK, CREATE, UPDATE } from './constants';

export const load = createRoutine(LOAD);
export const remove = createRoutine(REMOVE);
export const requestMagicLink = createRoutine(REQUEST_MAGIC_LINK);
export const create = createRoutine(CREATE);
export const update = createRoutine(UPDATE);
