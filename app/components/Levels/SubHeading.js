import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './sub-elements.scss';

const getClassName = cssModules(STYLES);

export default class SubHeading extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <h3 className={getClassName('sub-elements__h3')} {...rest}>
        {children}
      </h3>
    );
  }
}
