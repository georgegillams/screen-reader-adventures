import React from 'react';
import Level0 from './Level0';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level0Page = () => {
  return (
    <LevelWrapper
      levelNumber={1}
      description={getCopy('level0Description')}
      level={<Level0 />}
    />
  );
};

export default Level0Page;
