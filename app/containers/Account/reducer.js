import { fromJS } from 'immutable';
import {
  createInitialState,
  createAppReducer,
} from 'utils/redux-definitions/reducers';

import actionMeta from './actionMeta';
import constants from './constants';

const initialStateObj = createInitialState(actionMeta.actionDefinitions);
const initialState = fromJS(initialStateObj);

const reducer = createAppReducer(
  actionMeta.actionDefinitions,
  constants,
  initialState,
);

export default reducer;
