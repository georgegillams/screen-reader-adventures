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
      levelNumber={2}
      description={getCopy('level2Description')}
      level={generateLevelDefinition([
        ['s', 's', 's', 's', 's', 'a', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 's', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 's', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'a', 's', 's', 's', 's', 'g'],
      ])}
      startSpace={{ x: 0, y: 0 }}
      oilSpills={[{ x: 3, y: 0, width: 5, height: 4 }]}
      {...props}
    />
  );
};

export default Container;
