import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Login from 'containers/common/Login';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="login" />
      <Login {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
