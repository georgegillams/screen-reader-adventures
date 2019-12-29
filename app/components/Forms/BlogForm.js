import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/dist/Input';
import BpkCheckBox from 'bpk-component-checkbox';
import BpkTextArea from 'bpk-component-textarea';
import { cssModules } from 'bpk-react-utils';

import STYLES from './forms.scss';

import { Button } from 'gg-components/dist/Button';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class BlogForm extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    editedBlog: PropTypes.object.isRequired,
    onBlogChanged: PropTypes.func.isRequired,
    onUpdateBlog: PropTypes.func.isRequired,
    onCreateBlog: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  onBlogValueChanged = (attribute, event) => {
    const newValue = JSON.parse(JSON.stringify(this.props.editedBlog));
    newValue[attribute] =
      event.target.value === 'on' ? event.target.checked : event.target.value;
    this.props.onBlogChanged(newValue);
  };

  render() {
    const {
      className,
      elementClassName,
      checkboxElementClassName,
      blog,
      editedBlog,
      onBlogChanged,
      onUpdateBlog,
      onCreateBlog,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    const elementClassNameFinal = [getClassName('forms__component')];
    if (elementClassName) elementClassNameFinal.push(elementClassName);

    const checkboxElementClassNameFinal = [getClassName('forms__component')];
    if (checkboxElementClassName) {
      checkboxElementClassNameFinal.push(checkboxElementClassName);
    }

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <Button
          className={elementClassNameFinal.join(' ')}
          onClick={blog.id ? onUpdateBlog : onCreateBlog}
        >
          {blog.id ? 'Update blog' : 'Create new blog'}
        </Button>
        <br />
        <label htmlFor="blogId" className={getClassName('forms__label')}>
          Blog ID
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogId"
          name="blogId"
          value={editedBlog.id}
          onChange={event => {
            this.onBlogValueChanged('id', event);
          }}
          placeholder="Blog ID"
        />
        <label htmlFor="blogName" className={getClassName('forms__label')}>
          Blog name
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogName"
          name="Blog name"
          value={editedBlog.title}
          onChange={event => {
            this.onBlogValueChanged('title', event);
          }}
          placeholder="Blog name"
        />
        <label htmlFor="blogCardImage" className={getClassName('forms__label')}>
          Blog card image
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogCardImage"
          name="Blog card image"
          value={editedBlog.blogImage}
          onChange={event => {
            this.onBlogValueChanged('blogImage', event);
          }}
          placeholder="Blog card image"
        />
        <label
          htmlFor="blogCardHeroImage"
          className={getClassName('forms__label')}
        >
          Blog card hero image
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogCardHeroImage"
          name="Blog card hero image"
          value={editedBlog.blogHeroImage}
          onChange={event => {
            this.onBlogValueChanged('blogHeroImage', event);
          }}
          placeholder="Blog card hero image"
        />
        <label htmlFor="blogCardDate" className={getClassName('forms__label')}>
          Blog card date
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogCardDate"
          name="Blog card date"
          value={editedBlog.blogCardDate}
          onChange={event => {
            this.onBlogValueChanged('blogCardDate', event);
          }}
          placeholder="Blog card date"
        />
        <BpkCheckBox
          className={checkboxElementClassNameFinal.join(' ')}
          label="lightCard"
          name="lightCard"
          checked={blog.light}
          onChange={event => {
            this.onBlogValueChanged('light', event);
          }}
        />
        <br />
        <label htmlFor="blogCardLink" className={getClassName('forms__label')}>
          Blog card link
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogCardLink"
          name="Blog card link"
          value={editedBlog.link}
          onChange={event => {
            this.onBlogValueChanged('link', event);
          }}
          placeholder="Blog card link"
        />
        <label
          htmlFor="blogBannerColor"
          className={getClassName('forms__label')}
        >
          Blog banner color
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogBanneColor"
          name="Blog banner color"
          value={editedBlog.blogBannerColor}
          onChange={event => {
            this.onBlogValueChanged('blogBannerColor', event);
          }}
          placeholder="Blog banner color"
        />
        <label
          htmlFor="blogCardImageBorderColor"
          className={getClassName('forms__label')}
        >
          Blog card image border color
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogCardImageBorderColor"
          name="Blog card image border color"
          value={editedBlog.blogImageBorderColor}
          onChange={event => {
            this.onBlogValueChanged('blogImageBorderColor', event);
          }}
          placeholder="Blog card image border color"
        />
        <BpkCheckBox
          className={checkboxElementClassNameFinal.join(' ')}
          label="published"
          name="published"
          checked={editedBlog.published}
          onChange={event => {
            this.onBlogValueChanged('published', event);
          }}
        />
        <br />
        <label
          htmlFor="blogPublishedTimestamp"
          className={getClassName('forms__label')}
        >
          Blog published timestamp
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogPublishedTimestamp"
          name="Blog published timestamp"
          value={editedBlog.publishedTimestamp}
          onChange={event => {
            this.onBlogValueChanged('publishedTimestamp', event);
          }}
          placeholder="Blog published timestamp"
        />
        <br />
        <BpkCheckBox
          className={checkboxElementClassNameFinal.join(' ')}
          label="showInBlogsList"
          name="showInBlogsList"
          checked={editedBlog.showInBlogsList}
          onChange={event => {
            this.onBlogValueChanged('showInBlogsList', event);
          }}
        />
        <br />
        <BpkCheckBox
          className={checkboxElementClassNameFinal.join(' ')}
          label="showInTravelBlogsList"
          name="showInTravelBlogsList"
          checked={editedBlog.showInTravelBlogsList}
          onChange={event => {
            this.onBlogValueChanged('showInTravelBlogsList', event);
          }}
        />
        <label htmlFor="blogTags" className={getClassName('forms__label')}>
          Blog tags
        </label>
        <Input
          className={elementClassNameFinal.join(' ')}
          id="blogTags"
          name="Blog tags"
          value={
            editedBlog.tags && !editedBlog.tags.split
              ? editedBlog.tags.join(', ')
              : 'ERROR'
          }
          onChange={event => {
            this.onBlogValueChanged('tags', {
              target: { value: event.target.value.split(', ') },
            });
          }}
          placeholder="Blog tags"
        />
        <label htmlFor="blogContent" className={getClassName('forms__label')}>
          Blog content
        </label>
        <BpkTextArea
          style={{ minHeight: '45rem' }}
          className={elementClassNameFinal.join(' ')}
          id="blogContent"
          name="Blog content"
          value={editedBlog.content}
          onChange={event => {
            this.onBlogValueChanged('content', event);
          }}
          placeholder="Blog content"
        />
        <label htmlFor="blogBibtex" className={getClassName('forms__label')}>
          Blog bibtex
        </label>
        <BpkTextArea
          className={elementClassNameFinal.join(' ')}
          id="blogBibtex"
          name="Blog bibtex"
          value={editedBlog.bibtex}
          onChange={event => {
            this.onBlogValueChanged('bibtex', event);
          }}
          placeholder="Blog bibtex"
        />
      </div>
    );
  }
}
