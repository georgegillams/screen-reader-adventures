import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { SubSection, TextLink } from 'components/Typography';
import LoadingIndicator from 'components/LoadingIndicator';
import { NON_EMOJI_REGEX } from 'helpers/constants';
import redirects from 'helpers/redirects';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class SiteMap extends React.Component {
  componentWillMount = () => {
    this.props.loadBlogs();
  };

  render() {
    const { loading, error, blogs, loadBlogs, className, ...rest } = this.props;
    const outerClassNameFinal = [
      getClassName('pages__container'),
      getClassName('pages__container--centered'),
    ];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="SiteMap" />
        <LoadingIndicator loading={loading} error={error}>
          <div>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Blog 📝"
            >
              {blogs &&
                blogs.map(blog => {
                  if (!blog.showInBlogsList) {
                    return null;
                  }
                  return (
                    <div>
                      <TextLink href={`/blog/${blog.id}`}>
                        {blog.title
                          ? blog.title.match(NON_EMOJI_REGEX).join('')
                          : 'no name'}
                      </TextLink>
                      <br />
                    </div>
                  );
                })}
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Travel ✈️"
            >
              {blogs &&
                blogs.map(blog => {
                  if (!blog.showInTravelBlogsList) {
                    return null;
                  }
                  return (
                    <div>
                      <TextLink href={`/travel/${blog.id}`}>
                        {blog.title
                          ? blog.title.match(NON_EMOJI_REGEX).join('')
                          : 'no name'}
                      </TextLink>
                      <br />
                    </div>
                  );
                })}
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Other blogs"
            >
              {blogs &&
                blogs.map(blog => {
                  if (blog.showInTravelBlogsList || blog.showInBlogsList) {
                    return null;
                  }
                  return (
                    <div>
                      <TextLink href={`/blog/${blog.id}`}>
                        {blog.title
                          ? blog.title.match(NON_EMOJI_REGEX).join('')
                          : 'no name'}
                      </TextLink>
                      <br />
                    </div>
                  );
                })}
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Photography 🎨"
            >
              <TextLink href="/photography">
                See some artistic creations
              </TextLink>
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Work 📱"
            >
              <TextLink href="/work/degree">Degree</TextLink>
              <br />
              <TextLink href="/work">Portfolio</TextLink>
              <br />
              <TextLink href="/work/bpk-component-demo">
                Backpack Demo Component
              </TextLink>
              <br />
              <TextLink href="/apps/password-character-extractor">
                Password Character Extractor
              </TextLink>
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Machine learning 🤖"
            >
              <TextLink href="/ml/grammar">
                Using ML to predict grammatical correctness.
              </TextLink>
            </SubSection>
            {/* <SubSection noAnchor className={getClassName('pages__site-map-item')} name="Documents 🥇">
        <TextLink  href="/documents/degree">
         <SubSection noAnchor nclassName={getClassName('pages__site-map-item')}oPadding link name="Degree Certificate - 2018
      </TextLink>
        <br />
    </SubSection> */}
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Design 🎨"
            >
              <TextLink href="/design/privacy-policy">Privacy Policy</TextLink>
              <br />
              <TextLink href="/design/colours">Colours</TextLink>
              <br />
              <TextLink href="/design/components">Components</TextLink>
              <br />
              <TextLink href="/design/typography">Typography</TextLink>
              <br />
              <TextLink href="/design/lab">Lab</TextLink>
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Other stuff 🤷‍♂️"
            >
              <TextLink href="/about">About me</TextLink>
              <br />
              <TextLink href="/contact">Contact</TextLink>
              <br />
              <TextLink href="/gts">Location tracking</TextLink>
              <br />
              <TextLink href="/payments">Payments</TextLink>
              <br />
              <TextLink href="/monzoPots">Monzo savings</TextLink>
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Random 🐉"
            >
              <TextLink external href="/robots.txt">
                Robots.txt{' '}
              </TextLink>
              <br />
              <TextLink external href="/sitemap.xml">
                SiteMap.xml{' '}
              </TextLink>
              <br />
              <TextLink href="/418"> Error 418: I&apos;m a teapot</TextLink>
              <br />
              <TextLink href="/page-not-found"> 404 Page</TextLink>
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="API"
            >
              <TextLink external href="/api/gts/loadLatest">
                Tracking API endpoint{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/find_backpack_components">
                /greasemonkey/find_backpack_components{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/github_travis_new_tab">
                /greasemonkey/github_travis_new_tab{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/github_squash_reminder">
                /greasemonkey/github_squash_reminder{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/gurushots_boost">
                /greasemonkey/gurushots_boost{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/secureEcs_download">
                /greasemonkey/secureEcs_download{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/skyscanner_buttons">
                /greasemonkey/skyscanner_buttons{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/github_highlight_name">
                /greasemonkey/github_highlight_name{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/github_expand_comments">
                /greasemonkey/github_expand_comments{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/hackthis_coding_1">
                /greasemonkey/hackthis_coding_1{' '}
              </TextLink>
              <br />
              <TextLink external href="/greasemonkey/hackthis_coding_2">
                /greasemonkey/hackthis_coding_2{' '}
              </TextLink>
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Accounts 🔑"
            >
              <TextLink href="/sign-up">Sign up</TextLink>
              <br />
              <TextLink href="/account">Account</TextLink>
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Admin 👮‍♂️"
            >
              <TextLink href="/admin/sessions">Sessions</TextLink>
              <br />
              <TextLink href="/admin/blogs">Blogs</TextLink>
              <br />
              <TextLink href="/admin/blog-comments">Blog comments</TextLink>
              <br />
              <TextLink href="/admin/notifications">Notifications</TextLink>
              <br />
              <TextLink href="/admin/payments">Payments</TextLink>
              <br />
              <TextLink href="/admin/ping-pen-testing">
                Ping pen-testing
              </TextLink>
            </SubSection>
            <SubSection
              noAnchor
              className={getClassName('pages__site-map-item')}
              name="Redirects 👉"
            >
              {redirects.map(redirect => (
                <div>
                  <TextLink href={`${redirect.from}`}>
                    {`${redirect.from} ⇒ ${redirect.to}`}
                  </TextLink>
                  <br />
                </div>
              ))}
            </SubSection>
          </div>
        </LoadingIndicator>
      </div>
    );
  }
}

SiteMap.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blogs: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};
