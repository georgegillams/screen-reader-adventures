import React from 'react';
import Level0 from './Level0';
import LevelWrapper from 'components/Levels';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Level0Page = () => {
  return (
    <LevelWrapper
      levelNumber={1}
      description="This is a really simple level to get you started. Remember that you'll get the best experience by using Safari. Use cmd+option+shift and the arrow keys to navigate through the spaces below. Once you reach the goal at the end, you'll be able to progress to the next level 👍"
      level={<Level0 />}
    />
  );
};

export default Level0Page;
