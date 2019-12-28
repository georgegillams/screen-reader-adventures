import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const PageContainer = props => {
  const { className, ...rest } = props;

  const outerClassNames = [getClassName('pages__container')];

  if (className) {
    outerClassNames.push(className);
  }

  return <div className={outerClassNames.join(' ')} {...rest} />;
};

PageContainer.propTypes = {
  className: PropTypes.string,
};

PageContainer.defaultProps = {
  className: null,
};

export default PageContainer;
