import { fromJS } from 'immutable';

import actionMeta from './actionMeta';

import {
  createInitialState,
  createAppReducer,
} from 'utils/redux-definitions/reducers';

const constants = {};
const initialStateObj = createInitialState(actionMeta.actionDefinitions);
const initialState = fromJS(initialStateObj);

const reducer = createAppReducer(
  actionMeta.actionDefinitions,
  constants,
  initialState,
);

export default reducer;
