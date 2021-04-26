import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import { LoadingCover } from 'gg-components/LoadingCover';
import { DebugObject } from 'components/common/DebugObject';
import { Paragraph } from 'gg-components/Paragraph';
import Button from 'components/common/Button';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';

import Skeleton from './Skeleton';

import { LoggedInOnly } from 'components/common/Walls';
import STYLES from './account.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const Account = props => {
  const {
    logout,
    requestVerificationEmail,

    accountState,
    authenticatorState,

    className,
  } = props;
  const { user } = authenticatorState;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  const showEmail = user && user.email;
  const showUname = user && user.uname;
  const showUserDetails = showEmail || showUname;

  const page = (
    <div className={outerClassNames.join(' ')}>
      <LoggedInOnly
        user={authenticatorState.user}
        setLoginRedirect={() => {
          setPostLoginRedirect('account');
        }}>
        <PageTitle name="Account">
          {showUserDetails && (
            <Paragraph className={getClassName('account__details')}>
              {showEmail && <div>{`Email: ${user.email}`}</div>}
              {showUname && <div>{`Display name: ${user.uname}`}</div>}
            </Paragraph>
          )}
          <div className={getClassName('account__control-panel')}>
            {user && !user.emailVerified && (
              <>
                <Button
                  className={getClassName('account__button')}
                  loading={accountState && accountState.requestingVerificationEmail}
                  onClick={requestVerificationEmail}>
                  Get a new verification email
                </Button>
              </>
            )}
            {user && user.admin && (
              <>
                <Button className={getClassName('account__button')} href="/admin">
                  Admin
                </Button>
                <Button className={getClassName('account__button')} href="/status">
                  Site status
                </Button>
              </>
            )}
            <Button destructive loading={accountState && accountState.loggingOut} onClick={logout}>
              Logout
            </Button>
          </div>
        </PageTitle>
      </LoggedInOnly>
    </div>
  );

  return (
    <>
      <LoadingCover loadingSkeleton={Skeleton} loading={authenticatorState.user === undefined} error={false}>
        {page}
      </LoadingCover>
      <DebugObject
        debugTitle="Account"
        debugObject={{
          logout,
          authenticatorState,
          accountState,
        }}
      />
    </>
  );
};

Account.propTypes = {
  logout: PropTypes.func.isRequired,
  requestVerificationEmail: PropTypes.func.isRequired,
  accountState: PropTypes.shape({
    loggingOut: PropTypes.bool,
    logOutError: PropTypes.object,
    logOutResult: PropTypes.object,
    requestingVerificationEmail: PropTypes.bool,
    requestVerificationEmailError: PropTypes.object,
    requestVerificationEmailResult: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  className: PropTypes.string,
};

Account.defaultProps = {
  authenticatorState: null,
  logoutState: null,
  className: null,
};

export default Account;
