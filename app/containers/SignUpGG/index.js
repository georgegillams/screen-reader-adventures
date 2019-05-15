import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectCredentials,
  makeSelectSigningUp,
  makeSelectSignUpSuccess,
  makeSelectSignUpError,
} from './selectors';
import {
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { signUp, credentialsChanged } from './actions';
import { setCookiesAllowed } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import SignUp from './SignUp';

const mapDispatchToProps = dispatch => ({
  credentialsChanged: newValue => dispatch(credentialsChanged(newValue)),
  signUp: () => dispatch(signUp()),
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
});

const mapStateToProps = createStructuredSelector({
  credentials: makeSelectCredentials(),
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  signingUp: makeSelectSigningUp(),
  signUpSuccess: makeSelectSignUpSuccess(),
  signUpError: makeSelectSignUpError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signup', reducer });
const withSaga = injectSaga({ key: 'signup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignUp);
export { mapDispatchToProps };
