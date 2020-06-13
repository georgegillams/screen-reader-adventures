import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { LoadingCover } from 'gg-components/Auth';
import { CreativeCommons } from 'gg-components/CreativeCommons';

import Skeleton from './Skeleton';

import { BlogRenderer } from 'components/Typography';
import HelperFunctions from 'helpers/HelperFunctions';
import Comments from 'containers/Comments';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const BlogViewer = props => {
  useEffect(() => {
    const blogId = props.match.params.id;
    props.loadBlog(blogId);
  }, []);

  const { user, blogId, blogs, blogLoadError, className } = props;
  const outerClassNameFinal = [getClassName('pages__container--prose')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  let blog = null;
  if (blogs && blogs[blogId]) {
    blog = blogs[blogId];
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <Helmet title={blog ? blog.title : 'Blog loading'} />
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={!blog}
        error={blogLoadError}
      >
        {blog && (
          <>
            <BlogRenderer
              showEditLink={user && user.admin}
              centered={
                blog.tags
                  ? HelperFunctions.includes(blog.tags, 'travel')
                  : false
              }
              blog={blog}
            />
            <Comments pageId={blog.id} />
            <CreativeCommons />
          </>
        )}
      </LoadingCover>
    </div>
  );
};

BlogViewer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  loadBlog: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  blogId: PropTypes.string,
  blogLoadError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blogs: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

BlogViewer.defaultProps = {
  blogId: null,
  blogLoadError: null,
  blogs: null,
  className: null,
  user: null,
};

export default BlogViewer;
