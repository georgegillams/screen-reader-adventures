import React, { Fragment } from 'react';

import { SectionSkeleton, CardSkeleton } from 'gg-components/dist/Skeletons';

const AccountSkeleton = props => (
  <Fragment>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </Fragment>
);

export default AccountSkeleton;
