import { createSelector } from 'reselect';

import { KEY } from './constants';
import { initialState } from './reducer';

const selectDomain = state => state[KEY] || initialState;

const selectState = () => createSelector(selectDomain, subState => subState);

export { selectDomain, selectState };
