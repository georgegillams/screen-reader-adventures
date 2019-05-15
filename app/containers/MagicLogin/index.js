import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoggingIn,
  makeSelectLoginSuccessful,
  makeSelectLoginError,
} from './selectors';
import {
  makeSelectUser,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { login, tokenChanged } from './actions';
import { setCookiesAllowed } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import MagicLogin from './MagicLogin';

const mapDispatchToProps = dispatch => ({
  tokenChanged: newValue => dispatch(tokenChanged(newValue)),
  login: () => dispatch(login()),
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
});

const mapStateToProps = createStructuredSelector({
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  loggingIn: makeSelectLoggingIn(),
  loginSuccessful: makeSelectLoginSuccessful(),
  loginError: makeSelectLoginError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'magicLogin', reducer });
const withSaga = injectSaga({ key: 'magicLogin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MagicLogin);
export { mapDispatchToProps };
