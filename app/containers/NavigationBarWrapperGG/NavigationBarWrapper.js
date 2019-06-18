import React from 'react';
import PropTypes from 'prop-types';

import NavigationBar, { NavigationItem } from 'components/NavigationBar';
import { Logo } from 'components/Logo';
import { SmallButtonSkeleton } from 'components/Skeletons';

const NavigationBarWrapper = props => {
  const { user, userLoading, ...rest } = props;

  const accountItem = userLoading ? (
    <SmallButtonSkeleton />
  ) : (
    <NavigationItem
      name={user ? 'Account' : 'Login'}
      linkUrl={user ? '/account' : '/login'}
    />
  );

  const adminItem =
    user && user.admin ? (
      <NavigationItem name="Admin" linkUrl="/admin" />
    ) : null;

  const menuItems = [
    <NavigationItem name="Home" linkUrl="/" />,
    <NavigationItem name="Blog" linkUrl="/blog" />,
    <NavigationItem name="Photography" linkUrl="/photography" />,
    <NavigationItem name="Work" linkUrl="/work" />,
    <NavigationItem name="Contact" linkUrl="/contact" />,
    <NavigationItem
      name="Github"
      linkUrl="https://github.com/georgegillams"
      hrefExternal
    />,
    adminItem,
    accountItem,
    <NavigationItem name="Site map" linkUrl="/sitemap" />,
  ];

  return (
    <NavigationBar
      menuItems={menuItems}
      logo={<Logo noPadding small animated />}
      accountMenuItem={accountItem}
      {...rest}
    />
  );
};

NavigationBarWrapper.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userLoading: PropTypes.boolean.isRequired,
};

export default NavigationBarWrapper;
