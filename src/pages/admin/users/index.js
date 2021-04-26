import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Users from 'containers/common/Admin/Users';
import FlexLayout from 'components/common/FlexLayout';

const Page = props => {
  return (
    <FlexLayout>
      <CSSHack pageName="admin/users" />
      <Users {...props} />
    </FlexLayout>
  );
};

Page.propTypes = {};

export default Page;
