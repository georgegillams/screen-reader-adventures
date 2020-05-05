import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  const levelDefinition = generateLevelDefinition([
    ['s', 's', 's', 'a', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 's', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'p', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 's', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'a', 's', 'i', 's', 'g'],
  ]);

  // Goal square is 4 down, 7 across
  // Input square is 4 down, 5 across
  // TODO Write a helper for getting a gameState or levelPostition which returns null if any of these aren't satisfied
  levelDefinition[4][7].condition = gameState => {
    if (gameState && gameState[4] && gameState[4][5] && gameState[4][5].value) {
      return gameState[4][5].value === 'something';
    }
    return false;
  };

  // Paragraph square is 2 down, 3 across
  levelDefinition[2][3].text =
    'Some words must be entered, some text you must write. Try typing something, for that should suffice.';

  return (
    <LevelWrapper
      levelNumber={5}
      description={getCopy('level5Description')}
      level={levelDefinition}
      startSpace={{ x: 0, y: 0 }}
      {...props}
    />
  );
};

export default Container;
