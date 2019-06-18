import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import reducer from './reducer';
import saga from './saga';
import Admin from './Admin';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import appSelectors from 'containers/App/selectors';
import appActions from 'containers/App/actions';
import { mapSelectors } from 'helpers/redux/selectors';
import { mapActions } from 'helpers/redux/actions';

const mapDispatchToProps = dispatch => mapActions(dispatch, { ...appActions });

const mapStateToProps = createStructuredSelector(
  mapSelectors({ ...appSelectors }),
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'admin', reducer });
const withSaga = injectSaga({ key: 'admin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Admin);
export { mapDispatchToProps };
