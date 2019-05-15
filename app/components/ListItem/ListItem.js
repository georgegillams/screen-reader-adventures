import React from 'react';
import PropTypes from 'prop-types';
import STYLES from './style.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

const ListItem = props => (
  <div className={getClassName("list-item-wrapper")}>
    <li className={getClassName("list-item")}>{props.item}</li>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.any,
};

export default ListItem;
