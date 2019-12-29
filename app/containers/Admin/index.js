import appSelectors from 'containers/App/selectors';
import appActions from 'containers/App/actions';

import { composeContainer } from 'helpers/redux';
import actionMeta from './actionMeta';
import saga from './saga';
import reducer from './reducer';
import Container from './Container';

module.exports = composeContainer(
  Container,
  actionMeta.key,
  { ...appSelectors },
  { ...appActions },
  reducer,
  saga,
);
