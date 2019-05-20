import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level2Page = props => {
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
        levelNumber={2}
        description={getCopy('level2Description')}
        level={[
          ['a', 's', 's', 's', 's', 'a'],
          ['b', 'b', 'b', 's', 'b', 'b'],
          ['b', 'b', 'b', 's', 'b', 'b'],
          ['b', 'b', 'b', 'g', 'b', 'b'],
        ]}
        startSpace={{ x: 0, y: 0 }}
        monsterPositions={[{ x: 0, y: 4 }]}
      />
    </div>
  );
};

export default Level2Page;
