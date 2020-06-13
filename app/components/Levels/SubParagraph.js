import React, { Component } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';
import Space from './Space';

import STYLES from './sub-elements.scss';

const getClassName = cssModules(STYLES);

export default class SubParagraph extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <p className={getClassName('sub-elements__p')} {...rest}>
        {children}
      </p>
    );
  }
}
