import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectMakingPayment,
  makeSelectPaymentError,
  makeSelectPaymentSuccess,
} from './selectors';
import {
  makeSelectUser,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { setLoginRedirect } from 'containers/App/actions';
import {
  makeSelectLoadingBalance,
  makeSelectBalance,
  makeSelectLoadBalanceSuccess,
  makeSelectLoadBalanceError,
  makeSelectTicket,
  makeSelectTicketLoading,
} from 'containers/TicketStatus/selectors';
import {
  loadUserDetails,
  userDetailsChanged,
  updateUserDetails,
  makePayment,
  loadUserTicket,
  paymentTokenChanged,
} from './actions';
import { setCookiesAllowed } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import StripePayments from './StripePayments';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  paymentTokenChanged: newValue => dispatch(paymentTokenChanged(newValue)),
  makePayment: () => dispatch(makePayment()),
});

const mapStateToProps = createStructuredSelector({
  loadingBalance: makeSelectLoadingBalance(),
  balance: makeSelectBalance(),
  loadBalanceSuccess: makeSelectLoadBalanceSuccess(),
  loadBalanceError: makeSelectLoadBalanceError(),
  user: makeSelectUser(),
  makePaymentSuccess: makeSelectPaymentSuccess(),
  makePaymentError: makeSelectPaymentError(),
  makingPayment: makeSelectMakingPayment(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'stripePayments', reducer });
const withSaga = injectSaga({ key: 'stripePayments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StripePayments);
export { mapDispatchToProps };
