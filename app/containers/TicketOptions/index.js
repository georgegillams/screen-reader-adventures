import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectAvailableTickets,
  makeSelectLoadingAvailableTickets,
  makeSelectLoadAvailableTicketsSuccess,
  makeSelectLoadAvailableTicketsError,
} from './selectors';
import { loadAvailableTickets } from './actions';
import reducer from './reducer';
import saga from './saga';
import TicketOptions from './TicketOptions';

const mapDispatchToProps = dispatch => ({
  loadAvailableTickets: () => dispatch(loadAvailableTickets()),
});

const mapStateToProps = createStructuredSelector({
  availableTickets: makeSelectAvailableTickets(),
  availableTicketsLoading: makeSelectLoadingAvailableTickets(),
  loadAvailableTicketsSuccess: makeSelectLoadAvailableTicketsSuccess(),
  loadAvailableTicketsError: makeSelectLoadAvailableTicketsError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'ticketOptions', reducer });
const withSaga = injectSaga({ key: 'ticketOptions', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TicketOptions);
export { mapDispatchToProps };
