import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import appSelectors from 'containers/App/selectors';
import appActions from 'containers/App/actions';
import { mapSelectors } from 'helpers/redux/selectors';
import { mapActions } from 'helpers/redux/actions';
import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Account from './Account';

const mapDispatchToProps = dispatch =>
  mapActions(dispatch, { ...appActions, ...actions });

const mapStateToProps = createStructuredSelector(
  mapSelectors({ ...appSelectors, ...selectors }),
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'account', reducer });
const withSaga = injectSaga({ key: 'account', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Account);
export { mapDispatchToProps };
