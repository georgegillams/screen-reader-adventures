import createSelectors from 'helpers/redux/selectors';
import {
  inferPropertiesFromInitialState,
  initialState,
} from 'helpers/redux/reducers';
import reducer from './reducer';

module.exports = createSelectors(
  'authenticator',
  inferPropertiesFromInitialState(initialState(reducer)),
);
