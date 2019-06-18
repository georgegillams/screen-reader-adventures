import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectPC,
  makeSelectLoadingPC,
  makeSelectLoadPCError,
  makeSelectLoadPCSuccess,
} from './selectors';
import { loadPC } from './actions';
import reducer from './reducer';
import saga from './saga';
import Ticket from './Ticket';

import {
  makeSelectUser,
  makeSelectUserLoading,
} from 'containers/App/selectors';
import { setLoginRedirect } from 'containers/App/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  loadPC: () => dispatch(loadPC()),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  pc: makeSelectPC(),
  loadingPC: makeSelectLoadingPC(),
  loadPCError: makeSelectLoadPCError(),
  loadPCSuccess: makeSelectLoadPCSuccess(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'pc', reducer });
const withSaga = injectSaga({ key: 'pc', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Ticket);
export { mapDispatchToProps };
