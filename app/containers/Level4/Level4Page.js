import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level4Page = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  const levelDefinition = generateLevelDefinition([
    ['b', 'b', 'b', 'b', 'a', 's', 'i', 's', 'g'],
    ['b', 'b', 'b', 'b', 's', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 's', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 's', 'b', 'b', 'p', 'b'],
    ['a', 's', 's', 's', 'a', 'b', 'b', 'b', 'b'],
  ]);

  levelDefinition[0][8].hidden = 'TODO - text.toLowerCase() is not "something"';
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
        levelNumber={4}
        description={getCopy('level4Description')}
        level={levelDefinition}
        startSpace={{ x: 4, y: 0 }}
        monsterPositions={[]}
      />
    </div>
  );
};

export default Level4Page;
