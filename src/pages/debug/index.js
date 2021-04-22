import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Debug from 'containers/common/Debug';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="debug" />
      <Debug {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
