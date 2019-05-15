import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRegistration,
  makeSelectRegistering,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import { setLoginRedirect } from 'containers/App/actions';
import {
  makeSelectUser,
  makeSelectUserLoading,
} from 'containers/App/selectors';
import { registerUser } from './actions';
import reducer from './reducer';
import saga from './saga';
import TicketScanner from './TicketScanner';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  registerUser: ticketData => dispatch(registerUser(ticketData)),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  registration: makeSelectRegistration(),
  registering: makeSelectRegistering(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'unticketscanner', reducer });
const withSaga = injectSaga({ key: 'unticketscanner', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TicketScanner);
export { mapDispatchToProps };
