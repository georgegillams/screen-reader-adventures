import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectUserDetails,
  makeSelectUpdateingUserDetails,
  makeSelectUpdateUserDetailsSuccess,
  makeSelectUpdateUserDetailsError,
  makeSelectLoadingUserDetails,
  makeSelectLoadUserDetailsSuccess,
  makeSelectLoadUserDetailsError,
} from './selectors';
import {
  loadUserDetails,
  userDetailsChanged,
  updateUserDetails,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import SignUpContinue from './SignUpContinue';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectUser,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { setLoginRedirect } from 'containers/App/actions';
import { setCookiesAllowed } from 'containers/App/actions';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  userDetailsChanged: newValue => dispatch(userDetailsChanged(newValue)),
  loadUserDetails: () => dispatch(loadUserDetails()),
  updateUserDetails: () => dispatch(updateUserDetails()),
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
});

const mapStateToProps = createStructuredSelector({
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  userDetails: makeSelectUserDetails(),
  updatingUserDetails: makeSelectUpdateingUserDetails(),
  updateUserDetailsSuccess: makeSelectUpdateUserDetailsSuccess(),
  updateUserDetailsError: makeSelectUpdateUserDetailsError(),
  loadingUserDetails: makeSelectLoadingUserDetails(),
  loadUserDetailsSuccess: makeSelectLoadUserDetailsSuccess(),
  loadUserDetailsError: makeSelectLoadUserDetailsError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userDetails', reducer });
const withSaga = injectSaga({ key: 'userDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignUpContinue);
export { mapDispatchToProps };
