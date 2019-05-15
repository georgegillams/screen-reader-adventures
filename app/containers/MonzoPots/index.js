import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectMonzoError,
  makeSelectMonzoLoading,
  makeSelectMonzoPots,
  makeSelectMonzoSuccess,
  makeSelectPassword,
} from './selectors';
import { loadMonzo } from './actions';
import reducer from './reducer';
import saga from './saga';
import MonzoPots from './MonzoPots';

const mapDispatchToProps = dispatch => ({
  loadMonzo: password => dispatch(loadMonzo(password)),
});

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  monzoPots: makeSelectMonzoPots(),
  loading: makeSelectMonzoLoading(),
  success: makeSelectMonzoSuccess(),
  error: makeSelectMonzoError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'monzo', reducer });
const withSaga = injectSaga({ key: 'monzo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MonzoPots);
export { mapDispatchToProps };
