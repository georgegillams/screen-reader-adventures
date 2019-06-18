import reducer from './reducer';

import createSelectors from 'helpers/redux/selectors';
import {
  inferPropertiesFromInitialState,
  initialState,
} from 'helpers/redux/reducers';

module.exports = createSelectors(
  'blog',
  inferPropertiesFromInitialState(initialState(reducer)),
);
