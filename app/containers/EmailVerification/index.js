import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectVerifying,
  makeSelectVerifyError,
  makeSelectVerifySuccessful,
} from './selectors';
import { verify, tokenChanged } from './actions';
import reducer from './reducer';
import saga from './saga';
import EmailVerification from './EmailVerification';

import { setCookiesAllowed } from 'containers/App/actions';
import {
  makeSelectUser,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => ({
  tokenChanged: newValue => dispatch(tokenChanged(newValue)),
  verify: () => dispatch(verify()),
  onCookiesAccepted: () => dispatch(setCookiesAllowed(true)),
});

const mapStateToProps = createStructuredSelector({
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  verifying: makeSelectVerifying(),
  verifySuccess: makeSelectVerifySuccessful(),
  verifyError: makeSelectVerifyError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'verify', reducer });
const withSaga = injectSaga({ key: 'verify', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmailVerification);
export { mapDispatchToProps };
