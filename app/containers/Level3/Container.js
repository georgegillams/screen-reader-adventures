import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  const level = generateLevelDefinition([
    ['s', 's', 'l', 's', 'h'],
    ['b', 'b', 'b', 'b', 's'],
    ['b', 'b', 'b', 'b', 's'],
    ['b', 'b', 'b', 'b', 'g'],
  ]);
  level[0][4].getHint = gameState => {
    if (
      gameState &&
      gameState[0] &&
      gameState[0][4] &&
      gameState[0][4].visited
    ) {
      return null;
    } else {
      return getCopy('level3Hint');
    }
  };

  return (
    <LevelWrapper
      levelNumber={3}
      description={getCopy('level3Description')}
      level={level}
      startSpace={{ x: 0, y: 0 }}
      {...props}
    />
  );
};

export default Container;
