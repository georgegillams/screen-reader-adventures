import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectNotifications,
  makeSelectNotificationsLoading,
  makeSelectNotificationsError,
} from './selectors';
import { loadNotifications } from './actions';
import reducer from './reducer';
import saga from './saga';
import NotificationCenter from './NotificationCenter';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => ({
  loadNotifications: () => dispatch(loadNotifications()),
});

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotifications(),
  loading: makeSelectNotificationsLoading(),
  error: makeSelectNotificationsError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'notifications', reducer });
const withSaga = injectSaga({ key: 'notifications', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NotificationCenter);
export { mapDispatchToProps };
