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
      levelNumber={3}
      description={getCopy('level3Description')}
      level={generateLevelDefinition([
        ['s', 's', 'l', 's', 'h'],
        ['b', 'b', 'b', 'b', 's'],
        ['b', 'b', 'b', 'b', 's'],
        ['b', 'b', 'b', 'b', 'g'],
      ])}
      startSpace={{ x: 0, y: 0 }}
      {...props}
    />
  );
};

export default Container;
