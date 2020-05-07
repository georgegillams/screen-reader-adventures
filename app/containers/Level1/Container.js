import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  return (
    <LevelWrapper
      levelNumber={1}
      description={getCopy('level1Description')}
      level={generateLevelDefinition([['s', 's', 's', 's', 'g']])}
      startSpace={{ x: 0, y: 0 }}
      {...props}
    />
  );
};

export default Container;
