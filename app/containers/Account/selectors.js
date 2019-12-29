import actionMeta from './actionMeta';
import reducer from './reducer';

import createSelectors from 'helpers/redux/selectors';
import {
  inferPropertiesFromInitialState,
  getInitialState,
} from 'helpers/redux/reducers';

module.exports = createSelectors(
  actionMeta.key,
  inferPropertiesFromInitialState(getInitialState(reducer)),
);
