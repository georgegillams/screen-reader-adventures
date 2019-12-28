import { fromJS } from 'immutable';
import { createInitialState, createAppReducer } from 'helpers/redux/reducers';

import actionMeta from './actionMeta';

const constants = {};
const initialStateObj = createInitialState(actionMeta.actionDefinitions);
const initialState = fromJS(initialStateObj);

const reducer = createAppReducer(
  actionMeta.actionDefinitions,
  constants,
  initialState,
);

export default reducer;
