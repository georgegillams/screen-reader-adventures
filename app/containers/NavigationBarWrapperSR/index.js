import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import reducer from './reducer';
import saga from './saga';
import NavigationBarWrapper from './NavigationBarWrapper';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import appSelectors from 'containers/App/selectors';
import { mapSelectors } from 'helpers/redux/selectors';

const mapDispatchToProps = () => ({});

const mapStateToProps = createStructuredSelector(mapSelectors(appSelectors));

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'navigation', reducer });
const withSaga = injectSaga({ key: 'navigation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NavigationBarWrapper);
export { mapDispatchToProps };
