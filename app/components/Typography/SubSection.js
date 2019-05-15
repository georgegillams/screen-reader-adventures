import PropTypes from 'prop-types';
import React from 'react';
import TextLink from './TextLink';
import BpkText from 'bpk-component-text';

import STYLES from './typography.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

const SubSection = props => {
  const {
    link,
    fancy,
    light,
    name,
    noAnchor,
    className,
    hover,
    noPadding,
    textClassName,
    children,
    ...rest
  } = props;

  const classNameFinal = [getClassName('typography__main')];
  const textClassNameFinal = [
    'typography__text',
    'typography__text--subsection',
  ];
  if (hover) {
    if (light) {
      textClassNameFinal.push(getClassName('typography--hovering-light'));
    } else {
      textClassNameFinal.push(getClassName('typography--hovering'));
    }
  }
  if (!noAnchor) {
    textClassNameFinal.push(getClassName('typography__text--with-anchor-link'));
  }
  if (light) {
    classNameFinal.push(getClassName('typography--light'));
    textClassNameFinal.push(getClassName('typography--light'));
  }
  if (link) {
    classNameFinal.push(getClassName('typography__link'));
    textClassNameFinal.push(getClassName('typography__link'));
  }
  if (noPadding) {
    classNameFinal.push(getClassName('typography--no-padding'));
    textClassNameFinal.push(getClassName('typography--no-padding'));
  }
  if (fancy) {
    classNameFinal.push(getClassName('typography--fancy'));
    textClassNameFinal.push(getClassName('typography--fancy'));
  }
  if (className) {
    classNameFinal.push(className);
  }
  if (textClassName) {
    textClassNameFinal.push(textClassName);
  }

  const anchorLink = `${name}`
    .toLowerCase()
    .split(' ')
    .join('-');

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {!noAnchor && (
        <TextLink href={`#${anchorLink}`} className={getClassName("typography__anchor-link")}>
          §
        </TextLink>
      )}
      {name && (
        <BpkText
          tagName="h3"
          id={anchorLink}
          textStyle="lg"
          className={textClassNameFinal.join(' ')}
        >
          {name}
        </BpkText>
      )}
      {children}
    </div>
  );
};

SubSection.propTypes = {
  hover: PropTypes.bool,
  link: PropTypes.bool,
  fancy: PropTypes.bool,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
  noPadding: PropTypes.bool,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  style: PropTypes.style,
  children: PropTypes.node,
};

SubSection.defaultProps = {
  hover: false,
  link: false,
  fancy: false,
  noAnchor: false,
  light: false,
  noPadding: false,
  className: null,
  textClassName: null,
  style: null,
  children: null,
};

export default SubSection;
