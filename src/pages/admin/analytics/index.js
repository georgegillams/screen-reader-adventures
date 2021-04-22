import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Analytics from 'containers/common/Admin/Analytics';
import FlexLayout from 'components/common/FlexLayout';

const Page = props => {
  return (
    <FlexLayout>
      <CSSHack pageName="admin/analytics" />
      <Analytics {...props} />
    </FlexLayout>
  );
};

Page.propTypes = {};

export default Page;
