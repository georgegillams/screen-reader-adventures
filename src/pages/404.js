import React from 'react';

import CSSHack from 'components/common/CSSHack';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';
import NotFound from 'containers/common/NotFound';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="404" />
      <NotFound {...props}></NotFound>
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
