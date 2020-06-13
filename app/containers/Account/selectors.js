import actionMeta from './actionMeta';
import reducer from './reducer';

import createSelectors from 'utils/redux-definitions/selectors';
import {
  inferPropertiesFromInitialState,
  getInitialState,
} from 'utils/redux-definitions/reducers';

module.exports = createSelectors(
  actionMeta.key,
  inferPropertiesFromInitialState(getInitialState(reducer)),
);
