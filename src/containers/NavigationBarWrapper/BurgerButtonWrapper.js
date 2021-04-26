import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const BurgerButtonWrapper = props => {
  const { children } = props;

  const [isServer, setIsServer] = useState(typeof window === 'undefined');

  useEffect(() => {
    setIsServer(false);
  }, []);

  if (isServer) {
    return (
      <Link href="/sitemap">
        <a {...props} />
      </Link>
    );
  }

  return children;
};

BurgerButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BurgerButtonWrapper;
