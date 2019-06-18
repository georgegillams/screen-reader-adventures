import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Comp from './GeorgeTrackingSystem';

import { mapActions } from 'helpers/redux/actions';
import { mapSelectors } from 'helpers/redux/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => mapActions(dispatch, actions);

const mapStateToProps = createStructuredSelector(mapSelectors(selectors));

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'gts', reducer });
const withSaga = injectSaga({ key: 'gts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Comp);
export { mapDispatchToProps };
