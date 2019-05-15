/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import BpkInput from 'bpk-component-input';
import BpkLabel from 'bpk-component-label';

// import STYLES from './bpk-button.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED
//
// // This was originally depended upon from the bpk-react-utils package, however
// // we decided to inline it in this particular component so as not to bloat the
// // the bundles of consumers who are not yet on webpack 2
// // We'll revisit this again soon.
// const cssModules = (styles = {}) => className =>
//   styles[className] ? styles[className] : className;
//
// const getClassName = cssModules(STYLES);

type Props = {
  propName: Node,
  className: ?string,
};

const DemoStringComponent = props => {
  const { propName, className, onChange, value, ...rest } = props;

  return (
    <div>
      <BpkLabel htmlFor={propName}>{`${propName} (string)`}</BpkLabel>
      <BpkInput
        className={className}
        style={{ boxSizing: 'border-box' }}
        value={value}
        onChange={event => onChange(event.target.value)}
        id={propName}
        label={propName}
        {...rest}
      />
    </div>
  );
};

DemoStringComponent.propTypes = {
  propName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

DemoStringComponent.defaultProps = {
  className: null,
};

export default DemoStringComponent;
