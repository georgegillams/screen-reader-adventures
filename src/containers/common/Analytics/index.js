import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { sendAnalytic } from './actions';
import { selectState as selectConsentState } from '../Consent/selectors';
import { selectState } from './selectors';
import Analytics from './Container';
import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  consentState: selectConsentState(),
  analyticState: selectState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    sendAnalytic: payload => dispatch(sendAnalytic(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(Analytics);
