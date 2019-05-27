import React from 'react';
import NavigationBar, { NavigationItem } from 'components/NavigationBar';
import { SRLogo } from 'components/Logo';
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

  let menuItems1 = null;
  let menuItems2 = [adminItem, accountItem];

  return (
    <NavigationBar
      menuItems1={menuItems1}
      menuItems2={menuItems2}
      logo={<SRLogo noPadding small animated />}
      accountMenuItem={accountItem}
      {...rest}
    />
  );
};

export default NavigationBarWrapper;
