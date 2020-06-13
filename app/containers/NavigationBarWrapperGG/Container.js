import React from 'react';
import PropTypes from 'prop-types';
import { NavigationBar, NavigationItem } from 'gg-components/NavigationBar';
import { Logo } from 'gg-components/Logo';
import { SmallButtonSkeleton } from 'gg-components/Skeletons';

const NavigationBarWrapper = props => {
  const { user, userLoading } = props;

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
      logo={<Logo padding={false} small animated />}
      accountMenuItem={accountItem}
    />
  );
};

NavigationBarWrapper.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userLoading: PropTypes.boolean.isRequired,
};

export default NavigationBarWrapper;
