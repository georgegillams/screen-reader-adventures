import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/Cards';

import AboutPage from 'containers/About';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const HomePage = props => {
  const { user, userLoading } = props;

  return (
    <div className={getClassName('pages__container--centered')}>
      <Helmet title="Home" />
      <AboutPage />
      <div className={getClassName('pages__compact-card-container')}>
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          linkUrl="/blog"
          title="Blog"
        />
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
          linkUrl="/travel"
          title="Travel"
        />
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
          linkUrl="/photography"
          title="Photography"
        />
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
          linkUrl="/work"
          title="Work"
        />
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/iFbPZbn.jpg"
          linkUrl="/contact"
          title="Contact"
        />
        {!user && !userLoading && (
          <ArticleCard
            layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/login"
            title="Sign in"
          />
        )}
        {user && !userLoading && (
          <ArticleCard
            layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/account"
            title="Account"
          />
        )}
        {user && !userLoading && user.admin && (
          <ArticleCard
            layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/iFbPZbn.jpg"
            linkUrl="/admin"
            title="Admin area"
          />
        )}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  userLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

HomePage.defaultProps = {
  userLoading: false,
  user: null,
};

export default HomePage;
