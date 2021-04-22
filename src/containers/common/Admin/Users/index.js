import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { load, remove, requestMagicLink, create, update } from './actions';
import { selectState } from './selectors';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';
import AdminUsers from './Container';
import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  adminUsersState: selectState(),
  authenticatorState: selectAuthenticatorState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    load: payload => dispatch(load(payload)),
    remove: payload => dispatch(remove(payload)),
    requestMagicLink: payload => dispatch(requestMagicLink(payload)),
    create: payload => dispatch(create(payload)),
    update: payload => dispatch(update(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(AdminUsers);
