import actionMeta from './actionMeta';
import { selectors, actions, reducer } from './redux-definitions';
import saga from './saga';
import Container from './Container';

import { composeContainer } from 'utils/redux-definitions';
import appSelectors from 'containers/App/selectors';

module.exports = composeContainer(
  Container,
  actionMeta.key,
  { ...selectors, ...appSelectors },
  { ...actions },
  reducer,
  saga,
);
