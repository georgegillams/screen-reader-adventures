import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Account from 'containers/common/Account';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="account" />
      <Account {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
