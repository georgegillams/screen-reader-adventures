import appSelectors from 'containers/App/selectors';
import appActions from 'containers/App/actions';

import { composeContainer } from 'helpers/redux';
import actionMeta from './actionMeta';
import { selectors, actions, reducer } from './redux-definitions';
import saga from './saga';
import Container from './Container';

module.exports = composeContainer(
  Container,
  actionMeta.key,
  { ...selectors, ...appSelectors },
  { ...actions, appActions },
  reducer,
  saga,
);
