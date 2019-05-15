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
import DemoBooleanComponent from './DemoBooleanComponent';
import DemoStringComponent from './DemoStringComponent';
import DemoNumberComponent from './DemoNumberComponent';
import DemoFunctionComponent from './DemoFunctionComponent';
import HelperFunctions from 'helpers/HelperFunctions';

import STYLES from './bpk-demo.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

type Props = {
  propName: Node,
  className: ?string,
};

const DemoControl = props => {
  const { propName, className, onChange, value, ...rest } = props;

  let EditorComponent = null;
  switch (typeof value) {
    case 'function':
      EditorComponent = DemoFunctionComponent;
      break;
    case 'boolean':
      EditorComponent = DemoBooleanComponent;
      break;
    case 'number':
      EditorComponent = DemoNumberComponent;
      break;
    case 'string':
      EditorComponent = DemoStringComponent;
      break;
    default:
      EditorComponent = DemoStringComponent;
  }

  return (
    <EditorComponent
      className={className}
      value={value}
      onChange={newValue => {
        onChange(propName, newValue);
      }}
      propName={propName}
      {...rest}
    />
  );
};

DemoControl.propTypes = {
  propName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

DemoControl.defaultProps = {
  className: null,
};

export default DemoControl;
