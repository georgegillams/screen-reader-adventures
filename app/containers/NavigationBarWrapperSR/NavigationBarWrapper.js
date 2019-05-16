import React from 'react';
import NavigationBar, { NavigationItem } from 'components/NavigationBar';
// import { SRLogo } from 'components/Logo';
import { SmallButtonSkeleton } from 'components/Skeletons';

const NavigationBarWrapper = props => {
  const { user, userLoading, ...rest } = props;

  let menuItems1 = [
    <NavigationItem name="Blog" linkUrl="/blog" />,
    <NavigationItem name="Photography" linkUrl="/photography" />,
    <NavigationItem name="Work" linkUrl="/work" />,
  ];

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

  let menuItems2 = [
    <NavigationItem name="Contact" linkUrl="/contact" />,
    <NavigationItem
      name="Github"
      linkUrl="https://github.com/georgegillams"
      hrefExternal
    />,
    adminItem,
    accountItem,
  ];

  menuItems1 = [];
  menuItems2 = [adminItem, accountItem];

  return (
    <NavigationBar
      menuItems1={menuItems1}
      menuItems2={menuItems2}
      logo={null}
      accountMenuItem={accountItem}
      {...rest}
    />
  );
};

export default NavigationBarWrapper;
