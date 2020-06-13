import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { DebugObject, LoadingCover } from 'gg-components/Auth';
import { CreativeCommons } from 'gg-components/CreativeCommons';

import BlogListSkeleton from './BlogListSkeleton';
import BlogsNav from './BlogsNav';

import { BlogsList } from 'components/Blogs';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class BlogsPage extends React.Component {
  filteredBlogs = null;

  componentWillMount = () => {
    this.props.loadBlogs();
  };

  getTextColor = () => {
    try {
      const element = document.getElementById('app-wrapper');
      const style = window.getComputedStyle(element);
      return style.getPropertyValue('color');
    } catch (err) {
      return '#1e1e1e';
    }
  };

  componentWillReceiveProps = newProps => {
    if (newProps.blogs) {
      this.filteredBlogs = newProps.blogs;
      if (this.props.filter) {
        this.filteredBlogs = this.filteredBlogs.filter(this.props.filter);
      }
    }
  };

  render() {
    const {
      loadBlogs,

      blogsLoadError,
      blogs,

      selectedNav,
      filter,
      linkPrefix,
      className,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <DebugObject
          debugTitle="Blogs"
          debugObject={{
            blogs,
            loadBlogs,
            blogsLoadError,
            selectedNav,
            filter,
            linkPrefix,
            className,
          }}
        />
        <Helmet title="Blog" />
        <BlogsNav
          className={getClassName('pages__component')}
          style={{ marginTop: '1rem' }}
          selected={selectedNav}
        />
        <LoadingCover
          loadingSkeleton={BlogListSkeleton}
          loading={!blogs}
          error={blogsLoadError}
        >
          <>
            {this.filteredBlogs && (
              <BlogsList blogs={this.filteredBlogs} linkPrefix={linkPrefix} />
            )}
            <CreativeCommons />
          </>
        </LoadingCover>
      </div>
    );
  }
}

BlogsPage.propTypes = {
  blogsLoadError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // eslint-disable-next-line react/forbid-prop-types
  blogs: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
  selectedNav: PropTypes.string,
};

BlogsPage.defaultProps = {
  blogsLoadError: false,
  blogs: null,
  filter: null,
  linkPrefix: null,
  className: null,
  selectedNav: null,
};
