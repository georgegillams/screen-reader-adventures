import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from 'components/Cards';
import Tag from 'components/Tag';
import { NON_EMOJI_REGEX } from 'helpers/constants';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

const BlogCard = props => {
  const { className, blog, linkPrefix, ...rest } = props;

  return (
    <ArticleCard
      day={
        blog.blogCardDate
          ? blog.blogCardDate
          : new Date(1000 * blog.publishedTimestamp).getDate()
      }
      month={new Date(1000 * blog.publishedTimestamp).getMonth()}
      className={getClassName('pages__card')}
      fillImageSrc={blog.blogHeroImage}
      imageSrc={blog.blogImage}
      linkUrl={`${linkPrefix}/${blog.id}`}
      title={
        blog.title
          ? `${blog.title.match(NON_EMOJI_REGEX).join('')}${
              blog.deleted ? ' (deleted)' : ''
            }`
          : 'TITLE ERROR'
      }
      imageBorder={blog.blogImageBorderColor ? blog.blogImageBorderColor : null}
      bannerColor={blog.blogBannerColor ? blog.blogBannerColor : null}
      light={blog.light}
      {...rest}
    >
      {blog &&
        blog.tags &&
        !blog.tags.split &&
        blog.tags.map(tag => (
          <Tag className={getClassName('tag-filter__tag')} type={tag} />
        ))}
    </ArticleCard>
  );
};

BlogCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object.isRequired,
  linkPrefix: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BlogCard.defaultProps = {
  className: null,
};

export default BlogCard;
