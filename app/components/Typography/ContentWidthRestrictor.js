import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './content-width-restrictor.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const ContentWidthRestrictor = props => {
  const { children, className, ...rest } = props;

  const classNameFinal = [getClassName('content-width-restrictor__outer')];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <div className={getClassName('content-width-restrictor__content')}>
        {children}
      </div>
    </div>
  );
};

ContentWidthRestrictor.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ContentWidthRestrictor.defaultProps = {
  className: null,
};

export default ContentWidthRestrictor;
