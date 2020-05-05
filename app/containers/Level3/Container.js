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
        ['b', 's', 's', 'a', 'b'],
        ['b', 'b', 'b', 's', 'b'],
        ['b', 'b', 'b', 's', 'b'],
        ['a', 's', 's', 'a', 'b'],
        ['s', 'b', 'b', 'b', 'b'],
        ['s', 'b', 'b', 'b', 'b'],
        ['a', 's', 's', 's', 'g'],
      ])}
      startSpace={{ x: 0, y: 1 }}
      oilSpills={[{ x: 0, y: 0, width: 5, height: 7 }]}
      {...props}
    />
  );
};

export default Container;
