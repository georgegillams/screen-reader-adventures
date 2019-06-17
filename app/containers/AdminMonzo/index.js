import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import actions from './actions';
import selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import AdminMonzo from './AdminMonzo';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import appSelectors from 'containers/App/selectors';
import appActions from 'containers/App/actions';
import { mapSelectors } from 'helpers/redux/selectors';
import { mapActions } from 'helpers/redux/actions';

const mapDispatchToProps = dispatch =>
  mapActions(dispatch, { ...appActions, ...actions });

const mapStateToProps = createStructuredSelector(
  mapSelectors({ ...appSelectors, ...selectors }),
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminmonzo', reducer });
const withSaga = injectSaga({ key: 'adminmonzo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminMonzo);
export { mapDispatchToProps };
