import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import Card from 'components/common/Card';

import STYLES from './split-detail-item.scss';

const getClassName = cssModules(STYLES);

const SplitDetailItem = props => {
  const { children, ...rest } = props;

  return (
    <Card padded={false} {...rest}>
      <div className={getClassName('split-detail-item__content')}>{children}</div>
    </Card>
  );
};

SplitDetailItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SplitDetailItem;
