import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level5Page = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  const levelDefinition = generateLevelDefinition([
    [
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      's',
      'b',
      'b',
      'b',
      'b',
    ],
    [
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      's',
      'b',
      'b',
      'b',
      'b',
    ],
    [
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      's',
      'b',
      'b',
      'b',
      'b',
    ],
    [
      's',
      'c',
      's',
      's',
      'c',
      's',
      's',
      's',
      'c',
      's',
      's',
      's',
      'c',
      's',
      's',
      's',
      'g',
    ],
    [
      'b',
      'b',
      'b',
      'b',
      's',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
    ],
    [
      'b',
      'b',
      'b',
      'b',
      's',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
    ],
    [
      'b',
      'b',
      'b',
      'b',
      's',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
      'b',
    ],
  ]);

  levelDefinition[0][8].condition = gameState => {
    if (gameState && gameState[0] && gameState[0][6] && gameState[0][6].value) {
      return gameState[0][6].value === 'something';
    }
    return false;
  };
  levelDefinition[3][7].text =
    'Some words must be entered, some text you must write. Try typing something, for that should suffice.';

  return (
    <div
      className={`${getClassName('pages__container')} ${getClassName(
        'pages__container--centered',
      )}`}
      {...rest}
    >
      <LevelWrapper
        levelNumber={5}
        description={getCopy('Level5Description')}
        level={levelDefinition}
        startSpace={{ x: 3, y: 0 }}
        monsterPositions={[
          { x: 2, y: 12, moves: 'random' },
          { x: 4, y: 4, moves: 'random' },
        ]}
      />
    </div>
  );
};

export default Level5Page;
