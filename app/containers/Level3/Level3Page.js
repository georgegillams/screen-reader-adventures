import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level3Page = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div
      className={`${getClassName('pages__container')} ${getClassName(
        'pages__container--centered',
      )}`}
      {...rest}
    >
      <LevelWrapper
        levelNumber={3}
        description={getCopy('level3Description')}
        level={[
          ['a', 's', 's', 's', 's', 's', 's'],
          ['s', 'a', 's', 's', 's', 's', 'a'],
          ['s', 'a', 's', 's', 's', 'g', 's'],
          ['a', 's', 's', 's', 's', 's', 'a'],
        ]}
        startSpace={{ x: 0, y: 0 }}
        monsterPositions={[{ x: 2, y: 3, moves: 'random' }]}
      />
    </div>
  );
};

export default Level3Page;
