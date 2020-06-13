import {
  selectors as usersSelectors,
  actions as usersActions,
} from '../AdminUsers/redux-definitions';

import { selectors, actions, reducer } from './redux-definitions';
import actionMeta from './actionMeta';
import saga from './saga';
import Container from './Container';

import { composeContainer } from 'utils/redux-definitions';
import appSelectors from 'containers/App/selectors';

module.exports = composeContainer(
  Container,
  actionMeta.key,
  { ...selectors, ...usersSelectors, ...appSelectors },
  { ...actions, ...usersActions },
  reducer,
  saga,
);
