import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { mapSelectors } from './selectors';
import { mapActions } from './actions';

// TODO Write tests for this:
const composeContainer = (
  PageComponent,
  key,
  selectors,
  actions,
  reducer,
  saga,
) => {
  const mapDispatchToProps = dispatch => mapActions(dispatch, actions);

  const mapStateToProps = createStructuredSelector(mapSelectors(selectors));

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  const withReducer = injectReducer({ key, reducer });
  const withSaga = injectSaga({ key, saga });

  const composed = compose(
    withReducer,
    withSaga,
    withConnect,
  )(PageComponent);

  return { __esModule: true, mapDispatchToProps, default: composed };
};

export { composeContainer };
export default composeContainer;
