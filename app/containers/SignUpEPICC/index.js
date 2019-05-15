import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectCredentials,
  makeSelectTicketSelectionConfirmed,
  makeSelectSigningUp,
  makeSelectSignUpSuccess,
  makeSelectSignUpError,
  makeSelectSelectedTicketType,
} from './selectors';
import {
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import {
  signUp,
  credentialsChanged,
  setSelectedTicketType,
  setTicketSelectionConfirmed,
} from './actions';
import { setCookiesAllowed } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import SignUp from './SignUp';

const mapDispatchToProps = dispatch => ({
  credentialsChanged: newValue => dispatch(credentialsChanged(newValue)),
  setTicketSelectionConfirmed: newValue =>
    dispatch(setTicketSelectionConfirmed(newValue)),
  signUp: () => dispatch(signUp()),
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
  selectTicketType: value => dispatch(setSelectedTicketType(value)),
});

const mapStateToProps = createStructuredSelector({
  credentials: makeSelectCredentials(),
  ticketSelectionConfirmed: makeSelectTicketSelectionConfirmed(),
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  signingUp: makeSelectSigningUp(),
  signUpSuccess: makeSelectSignUpSuccess(),
  signUpError: makeSelectSignUpError(),
  selectedTicketType: makeSelectSelectedTicketType(),
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
