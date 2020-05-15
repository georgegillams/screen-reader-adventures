import React from 'react';
import { cssModules } from 'bpk-react-utils';
import { Paragraph } from 'gg-components/Typography';

import STYLES from './hint.scss';

const getClassName = cssModules(STYLES);

const Hint = props => {
  const { text, ...rest } = props;

  return (
    <div aria-hidden className={getClassName('hint__outer')} {...rest}>
      <Paragraph className={getClassName('hint__hint')}>{text}</Paragraph>
      <div className={getClassName('hint__arrow')} />
    </div>
  );
};

export default Hint;
