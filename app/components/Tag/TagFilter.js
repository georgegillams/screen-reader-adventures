import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import Tag, { TAG_TYPES } from './Tag';
import STYLES from './tag-filter.scss';

import HelperFunctions from 'helpers/HelperFunctions';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class TagFilter extends Component {
  static propTypes = { location: PropTypes.object };

  static defaultProps = { location: null };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if (HelperFunctions.includes(`${this.props.location.search}`, 'filter')) {
      const valuesString = `${this.props.location.search}`.split('=')[1];
      const selectedTagsOnLoad = [];
      valuesString.split('+').forEach(str => {
        selectedTagsOnLoad.push(str);
      });
      this.props.onSelectedTagsChanged(selectedTagsOnLoad);
    }
  };

  toggle = tagType => {
    const newSelectedTags = JSON.parse(JSON.stringify(this.props.selectedTags));
    if (HelperFunctions.includes(newSelectedTags, tagType)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tagType), 1);
    } else {
      newSelectedTags.push(tagType);
    }
    this.props.onSelectedTagsChanged(newSelectedTags);
    this.updateUrl(newSelectedTags);
  };

  updateUrl = selectedTags => {
    if (!this.props.history) {
      return;
    }
    const filterEnabled = selectedTags.length !== 0;
    if (filterEnabled) {
      this.props.history.push(`/blog?filter=${selectedTags.join('+')}`);
    } else {
      this.props.history.push('/blog');
    }
  };

  render() {
    const {
      className,
      selectedTags,
      onSelectedTagsChanged,
      history,
      ...rest
    } = this.props;

    const outerClassName = [getClassName('tag-filter__outer')];
    if (className) {
      outerClassName.push(className);
    }

    const filterEnabled = selectedTags.length !== 0;

    return (
      <div className={outerClassName.join(' ')} {...rest}>
        {Object.keys(TAG_TYPES).map(tagType => (
          <Tag
            ariaLabel={`${
              filterEnabled && !HelperFunctions.includes(selectedTags, tagType)
                ? 'Enable'
                : 'Disable'
            } ${tagType} filter`}
            disabled={
              filterEnabled && !HelperFunctions.includes(selectedTags, tagType)
            }
            className={getClassName('tag-filter__tag')}
            type={tagType}
            onClick={() => {
              this.toggle(tagType);
            }}
          />
        ))}
      </div>
    );
  }
}

TagFilter.propTypes = {
  onSelectedTagsChanged: PropTypes.func.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  history: PropTypes.func,
};

TagFilter.defaultProps = {
  className: null,
  history: null,
};

export default TagFilter;
