import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { PageTitle } from 'gg-components/Typography';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/Cards';
import { DebugObject, AdminOnly, LoadingCover } from 'gg-components/Auth';

import Skeleton from './Skeleton';

import { CookiesOnly } from 'components/Sessions';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const Admin = props => {
  const {
    setLoginRedirect,
    user,
    userLoading,
    userLoadError,
    cookiesAllowed,
    onCookiesAccepted,
    className,
  } = props;
  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  const page = (
    <div className={outerClassNameFinal.join(' ')}>
      <AdminOnly user={user} setLoginRedirect={() => setLoginRedirect('admin')}>
        <PageTitle name="Admin">
          <div className={getClassName('pages__compact-card-container')}>
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/admin/users"
              title="Users"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/admin/analytics"
              title="Analytics"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/monzoPots"
              title="Monzo"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/admin/notifications"
              title="Notifications"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/admin/blog"
              title="Blogs"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              linkUrl="/payments"
              title="Payments"
            />
          </div>
        </PageTitle>
      </AdminOnly>
    </div>
  );

  return (
    <>
      <Helmet title="Admin" />
      <CookiesOnly
        cookiesAccepted={cookiesAllowed}
        onAccept={onCookiesAccepted}
      />
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={!cookiesAllowed || userLoading}
        error={userLoadError}
      >
        {page}
      </LoadingCover>
      <DebugObject debugTitle="Admin" debugObject={{}} />
    </>
  );
};

Admin.propTypes = {
  setLoginRedirect: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onCookiesAccepted: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  userLoadError: PropTypes.object,
  cookiesAllowed: PropTypes.bool,
  className: PropTypes.string,
};

Admin.defaultProps = {
  user: null,
  userLoading: false,
  userLoadError: null,
  cookiesAllowed: false,
  className: null,
};

export default Admin;
