import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Section from './Section';
import BlogPreviewSubSection from './BlogPreviewSubSection';
import BlogPreviewContent from './BlogPreviewContent';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

class BlogPreviewSection extends Component {
  render() {
    const {
      blogSection,
      className,
      elementClassName,
      light,
      noAnchor,
      references,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) {
      classNameFinal.push(className);
    }
    const elementClassNameFinal = [getClassName('pages__card')];
    if (elementClassName) {
      elementClassNameFinal.push(elementClassName);
    }

    if (!blogSection || blogSection === '') {
      return null;
    }

    const blogSectionParts = blogSection.split('\n');
    const blogSectionName = blogSectionParts.shift();

    const blogSectionContent = blogSectionParts.join('\n');
    const blogSubSections = blogSectionContent.split('\n## ');
    const sectionTopLevelContent = blogSubSections.shift();

    return (
      <Section
        className={elementClassNameFinal.join(' ')}
        name={blogSectionName}
        light={light}
        noAnchor={noAnchor || blogSectionName === ''}
        {...rest}
      >
        <BlogPreviewContent
          references={references}
          content={sectionTopLevelContent}
          elementClassName={elementClassName}
        />
        {blogSubSections.map(ss => (
          <BlogPreviewSubSection
            references={references}
            blogSubSection={ss}
            elementClassName={elementClassName}
            light={light}
            noAnchor={noAnchor}
          />
        ))}
      </Section>
    );
  }
}

BlogPreviewSection.propTypes = {
  references: PropTypes.object,
  blogSection: PropTypes.string.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogPreviewSection.defaultProps = {
  references: null,
  className: null,
  elementClassName: null,
  light: false,
  noAnchor: false,
};

export default BlogPreviewSection;
