import React from 'react';

import CSSHack from 'components/common/CSSHack';
import PrivacyPolicy from 'containers/common/PrivacyPolicy';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="privacy-policy" />
      <PrivacyPolicy {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
