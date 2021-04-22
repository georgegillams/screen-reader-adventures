import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { load } from 'containers/common/Admin/Notifications/actions';
import { selectState } from 'containers/common/Admin/Notifications/selectors';
import Notifications from './Container';
import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from 'containers/common/Admin/Notifications/constants';
import saga from 'containers/common/Admin/Notifications/saga';
import reducer from 'containers/common/Admin/Notifications/reducer';

const mapStateToProps = createStructuredSelector({
  notificationsState: selectState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    load: payload => dispatch(load(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(Notifications);
