import React from 'react';

import CSSHack from 'components/common/CSSHack';
import SignUp from 'containers/common/SignUp';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="sign-up" />
      <SignUp {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
