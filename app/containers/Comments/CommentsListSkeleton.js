import React, { Fragment } from 'react';

import { SectionSkeleton, CardSkeleton } from 'gg-components/Skeletons';

const CommentsListSkeleton = props => (
  <Fragment>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </Fragment>
);

export default CommentsListSkeleton;
