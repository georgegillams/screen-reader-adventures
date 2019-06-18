import React from 'react';
import PropTypes from 'prop-types';

import GGButton from 'components/GGButton';

const NavigationItem = props => {
  const { name, linkUrl, className, ...rest } = props;

  return (
    <GGButton href={linkUrl} bouncy buttonClassName={className} {...rest}>
      {name}
    </GGButton>
  );
};

NavigationItem.propTypes = {
  name: PropTypes.string,
  linkUrl: PropTypes.string,
  className: PropTypes.string,
};

NavigationItem.defaultProps = {
  name: null,
  linkUrl: null,
  className: null,
};

export default NavigationItem;
