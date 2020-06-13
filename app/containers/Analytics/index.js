import actionMeta from './actionMeta';
import { selectors, actions, reducer } from './redux-definitions';
import saga from './saga';
import Container from './Container';

import { composeContainer } from 'utils/redux-definitions';
import appActions from 'containers/App/actions';

module.exports = composeContainer(
  Container,
  actionMeta.key,
  { ...selectors },
  { ...actions, ...appActions },
  reducer,
  saga,
);
