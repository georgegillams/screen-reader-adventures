import React from 'react';

import CSSHack from 'components/common/CSSHack';
import MagicLogin from 'containers/common/MagicLogin';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="magic-login" />
      <MagicLogin {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
