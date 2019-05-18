import React from 'react';
import LevelWrapper from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level1Page = props => {
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
        levelNumber={1}
        description={getCopy('level1Description')}
        level={[
          ['a', 's', 's', 's', 'a'],
          ['b', 'b', 'b', 'b', 's'],
          ['b', 'b', 'b', 'b', 's'],
          ['b', 'b', 'b', 'b', 's'],
          ['b', 'b', 'b', 'b', 'g'],
        ]}
        startSpace={{ x: 0, y: 0 }}
        monsterPositions={[]}
      />
    </div>
  );
};

export default Level1Page;
