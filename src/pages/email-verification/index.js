import React from 'react';

import CSSHack from 'components/common/CSSHack';
import EmailVerification from 'containers/common/EmailVerification';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="email-verification" />
      <EmailVerification {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
