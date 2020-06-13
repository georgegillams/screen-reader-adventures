import actionMeta from './actionMeta';
import { actions, reducer } from './redux-definitions';
import saga from './saga';
import Container from './Container';

import { composeContainer } from 'utils/redux-definitions';
import appSelectors from 'containers/App/selectors';

module.exports = composeContainer(
  Container,
  actionMeta.key,
  { ...appSelectors },
  { ...actions },
  reducer,
  saga,
);
