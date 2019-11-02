import reducer from './reducer';

import createSelectors from 'helpers/redux/selectors';
import {
  inferPropertiesFromInitialState,
  getInitialState,
} from 'helpers/redux/reducers';

module.exports = createSelectors(
  'account',
  inferPropertiesFromInitialState(getInitialState(reducer)),
);
