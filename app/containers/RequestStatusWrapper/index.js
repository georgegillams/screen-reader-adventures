import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { purgeMessages } from './actions';
import { makeSelectMessages } from './selectors';
import reducer from './reducer';
import saga from './saga';
import RequestStatusWrapper from './RequestStatusWrapper';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

const mapDispatchToProps = dispatch => ({
  purgeMessages: () => dispatch(purgeMessages()),
});

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'messages', reducer });
const withSaga = injectSaga({ key: 'messages', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RequestStatusWrapper);
export { mapDispatchToProps };
