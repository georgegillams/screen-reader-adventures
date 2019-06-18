import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectCredentials,
  makeSelectLoggingIn,
  makeSelectLoginSuccess,
  makeSelectLoginError,
} from './selectors';
import { login, credentialsChanged } from './actions';
import reducer from './reducer';
import saga from './saga';
import Login from './Login';

import { setCookiesAllowed } from 'containers/App/actions';
import {
  makeSelectUser,
  makeSelectError as makeSelectLoadUserError,
  makeSelectUserLoading,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => ({
  credentialsChanged: newValue => dispatch(credentialsChanged(newValue)),
  login: () => dispatch(login()),
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
});

const mapStateToProps = createStructuredSelector({
  credentials: makeSelectCredentials(),
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  userLoadError: makeSelectLoadUserError(),
  loggingIn: makeSelectLoggingIn(),
  loginSuccess: makeSelectLoginSuccess(),
  loginError: makeSelectLoginError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
export { mapDispatchToProps };
