import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectBlogs,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { loadBlogs } from './actions';
import reducer from './reducer';
import saga from './saga';
import SiteMap from './SiteMap';

const mapDispatchToProps = dispatch => ({
  loadBlogs: () => dispatch(loadBlogs()),
});

const mapStateToProps = createStructuredSelector({
  blogs: makeSelectBlogs(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'site-map', reducer });
const withSaga = injectSaga({ key: 'site-map', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SiteMap);
export { mapDispatchToProps };
