import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectRegistration,
  makeSelectRegistering,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import { registerUser } from './actions';
import reducer from './reducer';
import saga from './saga';
import TicketScanner from './TicketScanner';

import {
  makeSelectUser,
  makeSelectUserLoading,
} from 'containers/App/selectors';
import { setLoginRedirect } from 'containers/App/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

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

const withReducer = injectReducer({ key: 'ticketscanner', reducer });
const withSaga = injectSaga({ key: 'ticketscanner', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TicketScanner);
export { mapDispatchToProps };
