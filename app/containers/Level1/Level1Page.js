import React from 'react';
import Level1 from './Level1';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level1Page = () => {
  return (
    <LevelWrapper
      levelNumber={1}
      description={getCopy('level1Description')}
      level={<Level1 />}
    />
  );
};

export default Level1Page;
