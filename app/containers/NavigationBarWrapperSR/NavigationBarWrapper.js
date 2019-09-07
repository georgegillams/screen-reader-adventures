import React from 'react';
import NavigationBar, { NavigationItem } from 'gg-components/dist/NavigationBar';
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

  const homeItem = <NavigationItem name="Home" linkUrl="/" />;

  let menuItems = [homeItem, adminItem, accountItem];

  return (
    <NavigationBar
      menuItems={menuItems}
      logo={<SRLogo noPadding small animated />}
      accountMenuItem={accountItem}
      {...rest}
    />
  );
};

export default NavigationBarWrapper;
