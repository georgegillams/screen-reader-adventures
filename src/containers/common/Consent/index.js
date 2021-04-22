import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { consent, deferConsent, resetConsent } from './actions';
import { selectState } from './selectors';
import Consent from './Container';
import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  consentState: selectState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    consent: payload => dispatch(consent(payload)),
    deferConsent: payload => dispatch(deferConsent(payload)),
    resetConsent: payload => dispatch(resetConsent(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(Consent);
