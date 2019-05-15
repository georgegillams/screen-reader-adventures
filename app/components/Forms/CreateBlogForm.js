import React from 'react';
import PropTypes from 'prop-types';
import { STRING_REGEX, ID_REGEX, ANYTHING_REGEX } from 'helpers/constants';
import FormBuilder from './FormBuilder';

import STYLES from './forms.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

class CreateBlogForm extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, blog, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <FormBuilder
        entity={blog}
        formFields={[
          {
            id: 'requestedId',
            name: 'Requested ID',
            validationRegex: ID_REGEX,
            show: true,
          },
          {
            id: 'title',
            name: 'Title',
            validationRegex: ANYTHING_REGEX,
            show: true,
          },
          {
            id: 'tags',
            name: 'Tags',
            validationRegex: ANYTHING_REGEX,
            show: true,
          },
          {
            id: 'blogImage',
            name: 'Blog image',
            validationRegex: ANYTHING_REGEX,
            show: true,
          },
          {
            id: 'publishedTimestamp',
            name: 'Published timestamp',
            validationRegex: ANYTHING_REGEX,
            show: true,
          },
          {
            id: 'blogCardDate',
            name: 'Blog card date override',
            validationRegex: ANYTHING_REGEX,
            show: true,
          },
          {
            id: 'light',
            name: 'Light',
            validationRegex: null,
            type: 'CHECKBOX',
            show: true,
          },
          {
            id: 'published',
            name: 'Published',
            validationRegex: null,
            type: 'CHECKBOX',
            show: true,
          },
          {
            id: 'showInBlogsList',
            name: 'Show in blogs list',
            validationRegex: null,
            type: 'CHECKBOX',
            show: true,
          },
          {
            id: 'showInTravelBlogsList',
            name: 'Show in travel blogs list',
            validationRegex: null,
            type: 'CHECKBOX',
            show: true,
          },
          {
            id: 'blogImageBorderColor',
            name: 'Blog image border color',
            validationRegex: STRING_REGEX,
            show: true,
          },
          {
            id: 'content',
            name: 'Content',
            long: true,
            validationRegex: ANYTHING_REGEX,
            show: true,
          },
        ]}
        {...rest}
      />
    );
  }
}

export default CreateBlogForm;
