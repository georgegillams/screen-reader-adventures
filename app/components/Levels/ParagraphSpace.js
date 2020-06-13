import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';
import Space from './Space';

import OPEN_STYLES from './space.scss';
import STYLES from './paragraph-space.scss';

const getClassName = cssModules({ ...OPEN_STYLES, ...STYLES });

export default class ParagraphSpace extends Component {
  render() {
    const { children, text, spaceNumber, ...rest } = this.props;

    return (
      <Space
        aria-label={`Space ${spaceNumber}. ${text}`}
        className={getClassName('paragraph')}
        {...rest}
      >
        <span aria-hidden="true">p</span>
      </Space>
    );
  }
}
