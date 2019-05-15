import React, { Component } from 'react';
import PropTypes from 'prop-types';

import STYLES from './tag-complex.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

export const TAG_TYPES = {
  tech: 'tech',
  travel: 'travel',
  photography: 'photography',
  events: 'events',
  security: 'security',
};

const tagTypeInnerClassNames = {
  [TAG_TYPES.tech]: 'tag__inner-tag--tech',
  [TAG_TYPES.travel]: 'tag__inner-tag--travel',
  [TAG_TYPES.photography]: 'tag__inner-tag--photography',
  [TAG_TYPES.events]: 'tag__inner-tag--events',
  [TAG_TYPES.security]: 'tag__inner-tag--security',
};

const tagTypeAngleClassNames = {
  [TAG_TYPES.tech]: 'tag__inner-triangle--tech',
  [TAG_TYPES.travel]: 'tag__inner-triangle--travel',
  [TAG_TYPES.photography]: 'tag__inner-triangle--photography',
  [TAG_TYPES.events]: 'tag__inner-triangle--events',
  [TAG_TYPES.security]: 'tag__inner-triangle--security',
};

const tagText = {
  [TAG_TYPES.tech]: 'Tech',
  [TAG_TYPES.travel]: 'Travel',
  [TAG_TYPES.photography]: 'Photography',
  [TAG_TYPES.events]: 'Events',
  [TAG_TYPES.security]: 'Security',
};

class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const {
      className,
      disabled,
      ariaLabel,
      type,
      children,
      onClick,
      link,
      ...rest
    } = this.props;

    const outerClassNameFinal = [getClassName('tag__outer')];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const tagClassName = [getClassName('tag__inner-tag')];
    const angleClassName = [getClassName('tag__inner-triangle')];
    if (type) {
      tagClassName.push(tagTypeInnerClassNames[type]);
      angleClassName.push(tagTypeAngleClassNames[type]);
    }

    if (this.state.hovering && (link || onClick)) {
      tagClassName.push(getClassName('tag__inner-tag--hovered'));
      angleClassName.push(getClassName('tag__inner-triangle--hovered'));
    }

    if (disabled) {
      outerClassNameFinal.push(getClassName('tag__inner-tag--disabled'));
    }

    const tagComponent = (
      <span className={getClassName("tag__inner")}>
        <span className={angleClassName.join(' ')} />
        <span className={tagClassName.join(' ')}>{`${tagText[type]}`}</span>
        <span className={getClassName("tag__inner-hole")} />
      </span>
    );

    if (link) {
      return (
        <a
          role="button"
          aria-label={ariaLabel}
          className={outerClassNameFinal.join(' ')}
          to={`/blog?filter=${type}`}
        >
          {tagComponent}
        </a>
      );
    } else if (onClick) {
      return (
        <div
          role="button"
          aria-label={ariaLabel}
          onKeyPress={onClick}
          onMouseEnter={() => {
            this.setState({ hovering: true });
          }}
          tabIndex="0"
          onFocus={() => {
            this.setState({ hovering: true });
          }}
          onMouseLeave={() => {
            this.setState({ hovering: false });
          }}
          onBlur={() => {
            this.setState({ hovering: false });
          }}
          onClick={onClick}
          className={outerClassNameFinal.join(' ')}
          {...rest}
        >
          {tagComponent}
        </div>
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        {tagComponent}
      </div>
    );
  }
}

Tag.propTypes = {
  disabled: PropTypes.bool,
  link: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(TAG_TYPES),
  className: PropTypes.string,
  children: PropTypes.node,
  ariaLabel: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  disabled: false,
  link: false,
  onClick: null,
  type: null,
  className: null,
  children: null,
};

export default Tag;
