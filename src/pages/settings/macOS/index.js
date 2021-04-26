import React from 'react';

import CSSHack from 'components/common/CSSHack';
import SettingsMacOS from 'containers/SettingsMacOS';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="settings/macOS" />
      <SettingsMacOS {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
