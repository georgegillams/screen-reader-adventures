import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Status from 'containers/common/Status';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';
import appConfig from 'helpers/appConfig';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { STARTED_AT } = publicRuntimeConfig;
const { builtAt, nodeEnv } = appConfig;

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="status" />
      <Status
        appConfig={appConfig}
        startedAt={parseInt(STARTED_AT, 10)}
        builtAt={parseInt(builtAt, 10)}
        nodeEnv={nodeEnv}
        {...props}
      />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
