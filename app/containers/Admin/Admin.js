import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import { Section } from 'components/Typography';
import { DebugObject, AdminOnly, LoadingCover } from 'components/Auth';
import Skeleton from './Skeleton';
import { CookiesOnly } from 'components/Sessions';

import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class Admin extends React.Component {
  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      userLoadError,
      cookiesAllowed,
      onCookiesAccepted,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin')}
        >
          <Section name="Admin">
            <div className={getClassName('pages__compact-card-container')}>
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/users"
                title="Users"
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/monzo"
                title="Monzo"
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/notifications"
                title="Notifications"
              />
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/blog"
                title="Blogs"
              />
            </div>
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

Admin.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
