import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectSelectedTicketType,
  makeSelectAvailableTickets,
  makeSelectLoadingAvailableTickets,
  makeSelectLoadAvailableTicketsError,
} from './selectors';
import { setSelectedTicketType, swapTickets } from './actions';
import reducer from './reducer';
import saga from './saga';
import SwapTicket from './SwapTicket';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { setLoginRedirect } from 'containers/App/actions';
import {
  makeSelectUser,
  makeSelectError as makeSelectUserLoadError,
  makeSelectUserLoading,
} from 'containers/App/selectors';
import { setCookiesAllowed } from 'containers/App/actions';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  selectTicketType: value => dispatch(setSelectedTicketType(value)),
  swapTickets: value => dispatch(swapTickets()),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  selectedTicketType: makeSelectSelectedTicketType(),
  loadingAvailableTickets: makeSelectLoadingAvailableTickets(),
  loadTicketsError: makeSelectLoadAvailableTicketsError(),
  userLoadError: makeSelectUserLoadError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'ticketSwap', reducer });
const withSaga = injectSaga({ key: 'ticketSwap', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SwapTicket);
export { mapDispatchToProps };
