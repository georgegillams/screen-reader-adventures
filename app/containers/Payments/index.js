import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectPayment,
  makeSelectCreatedPayment,
  makeSelectPaymentCreating,
  makeSelectPaymentError,
} from './selectors';
import { createPayment, paymentChanged } from './actions';
import reducer from './reducer';
import saga from './saga';
import PaymentsPage from './PaymentsPage';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => ({
  paymentChanged: newValue => dispatch(paymentChanged(newValue)),
  createPayment: () => dispatch(createPayment()),
});

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment(),
  createdPayment: makeSelectCreatedPayment(),
  paymentCreating: makeSelectPaymentCreating(),
  createPaymentError: makeSelectPaymentError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'payments', reducer });
const withSaga = injectSaga({ key: 'payments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PaymentsPage);
export { mapDispatchToProps };
