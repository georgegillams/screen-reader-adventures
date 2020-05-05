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
        ['a', 's', 's', 's', 's', 's', 's'],
        ['s', 'a', 's', 's', 's', 's', 'a'],
        ['s', 'a', 's', 's', 's', 'g', 's'],
        ['a', 's', 's', 's', 's', 's', 'a'],
      ])}
      startSpace={{ x: 0, y: 0 }}
      monsterPositions={[{ x: 2, y: 3, moves: 'random' }]}
      {...props}
    />
  );
};

export default Container;
