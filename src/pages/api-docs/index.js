import React from 'react';

import CSSHack from 'components/common/CSSHack';
import ApiDocs from 'containers/common/ApiDocs';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="api-docs" />
      <ApiDocs {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
