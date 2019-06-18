import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Comp from './AdminBlogEdit';

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

const withReducer = injectReducer({ key: 'adminblogedit', reducer });
const withSaga = injectSaga({ key: 'adminblogedit', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Comp);
export { mapDispatchToProps };
