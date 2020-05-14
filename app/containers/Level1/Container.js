import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  const level = generateLevelDefinition([['s', 's', 's', 's', 'g']]);
  level[0][4].getHint = gameState => {
    if (
      gameState &&
      gameState[0] &&
      gameState[0][2] &&
      gameState[0][2].visited
    ) {
      return null;
    } else {
      return getCopy('level2Hint');
    }
  };

  return (
    <LevelWrapper
      levelNumber={1}
      description={getCopy('level1Description')}
      level={level}
      startSpace={{ x: 0, y: 0 }}
      {...props}
    />
  );
};

export default Container;
