import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import BlogCard from './BlogCard';

import ArticleCard from 'components/Cards';
import Tag from 'components/Tag';
import { NON_EMOJI_REGEX } from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const BlogsList = props => {
  const { className, blogs, linkPrefix, ...rest } = props;

  return (
    <div {...rest}>
      {blogs.map(blog => (
        <BlogCard blog={blog} linkPrefix={linkPrefix} />
      ))}
    </div>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkPrefix: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BlogsList.defaultProps = {
  className: null,
};

export default BlogsList;
