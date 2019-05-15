import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import AboutPage from 'containers/About/About';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class HomePage extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { user } = this.props;

    return (
      <div
        className={`${getClassName('pages__container')} ${getClassName(
          'pages__container--centered',
        )}`}
      >
        <Helmet title="Home" />
        <AboutPage />
        <div className={getClassName('pages__compact-card-container')}>
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/login"
            title="Sign in"
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/account"
            title="Account"
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/blog"
            title="Blog"
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
            linkUrl="/travel"
            title="Travel"
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
            linkUrl="/photography"
            title="Photography"
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
            linkUrl="/work"
            title="Work"
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
            linkUrl="/about"
            title="About"
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/iFbPZbn.jpg"
            linkUrl="/contact"
            title="Contact"
          />
          {user && user.admin && (
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
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
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
