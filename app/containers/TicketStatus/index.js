import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectLoadingBalance,
  makeSelectBalance,
  makeSelectLoadBalanceSuccess,
  makeSelectLoadBalanceError,
  makeSelectLoadingUserTicket,
  makeSelectUserTicket,
  makeSelectLoadUserTicketSuccess,
  makeSelectLoadUserTicketError,
} from './selectors';
import { loadBalance, loadUserTicket } from './actions';
import reducer from './reducer';
import saga from './saga';
import TicketStatus from './TicketStatus';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => ({
  loadUserTicket: () => dispatch(loadUserTicket()),
  loadBalance: () => dispatch(loadBalance()),
});

const mapStateToProps = createStructuredSelector({
  loadingBalance: makeSelectLoadingBalance(),
  balance: makeSelectBalance(),
  loadBalanceSuccess: makeSelectLoadBalanceSuccess(),
  loadBalanceError: makeSelectLoadBalanceError(),
  loadingUserTicket: makeSelectLoadingUserTicket(),
  userTicket: makeSelectUserTicket(),
  loadUserTicketSuccess: makeSelectLoadUserTicketSuccess(),
  loadUserTicketError: makeSelectLoadUserTicketError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'ticketStatus', reducer });
const withSaga = injectSaga({ key: 'ticketStatus', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TicketStatus);
export { mapDispatchToProps };
