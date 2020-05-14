import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  const level = generateLevelDefinition([
    ['s', 's', 's', 's'],
    ['b', 'b', 'b', 's'],
    ['b', 'b', 'b', 's'],
    ['b', 'b', 'b', 'g'],
  ]);
  level[3][3].getHint = gameState => {
    if (
      gameState &&
      gameState[1] &&
      gameState[1][3] &&
      gameState[1][3].visited
    ) {
      return null;
    } else {
      return getCopy('level2Hint');
    }
  };

  return (
    <LevelWrapper
      levelNumber={2}
      description={getCopy('level2Description')}
      level={level}
      startSpace={{ x: 0, y: 0 }}
      {...props}
    />
  );
};

export default Container;
