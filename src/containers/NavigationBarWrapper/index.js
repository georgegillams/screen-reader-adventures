import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';

import NavigationBarWrapper from './Container';

const mapStateToProps = createStructuredSelector({
  authenticatorState: selectAuthenticatorState(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(NavigationBarWrapper);
