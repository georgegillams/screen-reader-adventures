import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectRegister,
  makeSelectRegisterLoading,
  makeSelectRegisterLoadedSuccess,
  makeSelectRegisterLoadedError,
} from './selectors';
import { loadRegister } from './actions';
import reducer from './reducer';
import saga from './saga';
import AdminRegister from './AdminRegister';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { setLoginRedirect } from 'containers/App/actions';
import { setCookiesAllowed } from 'containers/App/actions';

const mapDispatchToProps = dispatch => ({
  setLoginRedirect: lr => dispatch(setLoginRedirect(lr)),
  loadRegister: () => dispatch(loadRegister()),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
  register: makeSelectRegister(),
  registerLoading: makeSelectRegisterLoading(),
  registerLoadedSuccess: makeSelectRegisterLoadedSuccess(),
  registerLoadedError: makeSelectRegisterLoadedError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminregister', reducer });
const withSaga = injectSaga({ key: 'adminregister', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminRegister);
export { mapDispatchToProps };
