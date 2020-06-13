import { fromJS } from 'immutable';

import { populateConstants, mapActions, defineActions } from './actions';
import {
  defineConstants,
  inferConstantsFromActionDefinitions,
} from './constants';
import {
  inferPropertiesFromInitialState,
  getInitialState,
  createInitialState,
  createAppReducer,
} from './reducers';
import { composeContainer } from './containers';
import { createSelectors, mapSelectors } from './selectors';

// TODO TEST THIS FILE

const createReduxComponents = actionMeta => {
  const inferedConstants = inferConstantsFromActionDefinitions(
    actionMeta.actionDefinitions,
  );

  const constants = defineConstants(...inferedConstants);

  const initialStateObj = createInitialState(actionMeta.actionDefinitions);
  const initialState = fromJS(initialStateObj);

  const reducer = createAppReducer(
    actionMeta.actionDefinitions,
    constants,
    initialState,
  );

  const actions = defineActions(
    populateConstants(actionMeta.actionDefinitions, constants),
  );

  const selectors = createSelectors(
    actionMeta.key,
    inferPropertiesFromInitialState(getInitialState(reducer)),
  );

  return {
    reducer,
    actions,
    selectors,
    constants,
  };
};

export { createReduxComponents, mapSelectors, mapActions, composeContainer };
export default createReduxComponents;
