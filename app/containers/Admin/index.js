import actionMeta from './actionMeta';
import saga from './saga';
import reducer from './reducer';
import Container from './Container';

import { composeContainer } from 'utils/redux-definitions';
import appActions from 'containers/App/actions';
import appSelectors from 'containers/App/selectors';

module.exports = composeContainer(
  Container,
  actionMeta.key,
  { ...appSelectors },
  { ...appActions },
  reducer,
  saga,
);
