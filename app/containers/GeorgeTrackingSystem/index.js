import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { mapSelectors } from 'helpers/redux/selectors';
import { mapActions } from 'helpers/redux/actions';
import selectors from './selectors';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Comp from './GeorgeTrackingSystem';

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
