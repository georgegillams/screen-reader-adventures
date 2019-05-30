import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import OPEN_STYLES from './space.scss';
import STYLES from './paragraph-space.scss';

const getClassName = cssModules({ ...OPEN_STYLES, ...STYLES });

export default class ParagraphSpace extends Component {
  render() {
    const { children, text, ...rest } = this.props;

    return (
      <p
        aria-label={text}
        className={getClassName('space__space', 'paragraph-space__space')}
        {...rest}
      >
        <div className={getClassName('space__drop')} />
        <div className={getClassName('space__drop', 'space__drop--slide')} />
        <span aria-hidden="true">p</span>
      </p>
    );
  }
}
