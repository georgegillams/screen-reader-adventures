import appActions from 'containers/App/actions';

import { composeContainer } from 'helpers/redux';
import actionMeta from './actionMeta';
import { selectors, actions, reducer } from './redux-definitions';
import saga from './saga';
import Authenticator from './Authenticator';

module.exports = composeContainer(
  Authenticator,
  actionMeta.key,
  { ...selectors },
  { ...actions, ...appActions },
  reducer,
  saga,
);
