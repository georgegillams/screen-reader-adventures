import reducer from './reducer';

import createSelectors from 'utils/redux-definitions/selectors';
import {
  inferPropertiesFromInitialState,
  getInitialState,
} from 'utils/redux-definitions/reducers';

module.exports = createSelectors(
  'adminblogs',
  inferPropertiesFromInitialState(getInitialState(reducer)),
);
