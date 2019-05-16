import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { TextLink, Section } from 'components/Typography';
import GGButton from 'components/GGButton';
import PhotoGallery from 'components/PhotoGallery';
import { Space, GoalSpace } from 'components/Levels';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level1 = props => {
  const { onLevelComplete, ...rest } = props;

  return (
    <div {...rest}>
      <Space spaceNumber={1} />
      <Space spaceNumber={2} />
      <Space spaceNumber={3} />
      <Space spaceNumber={4} />
      <GoalSpace spaceNumber={5} onVisit={() => onLevelComplete()} />
    </div>
  );
};

export default Level1;
