import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BpkProgress, {
  themeAttributes as progressThemeAttributes,
} from 'bpk-component-progress';
import BpkThemeProvider from 'bpk-theming';
import { cssModules } from 'bpk-react-utils';

import STYLES from './degree-module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const DegreeModule = props => {
  const {
    name,
    minimum,
    predicted,
    markerPosition,
    percentage,
    filled,
    className,
    ...rest
  } = props;

  const classNameFinal = [getClassName('degree-module')];
  if (className) {
    classNameFinal.push(className);
  }

  let progress = (
    <BpkProgress
      style={{ position: 'absolute', width: '100%', top: '-.2rem' }}
      small
      min={0}
      max={100}
      value={filled ? percentage || 0 : 0}
      aria-label={`Degree percentage - ${
        percentage ? `${percentage}%` : 'pending'
      }`}
    />
  );

  if (minimum) {
    progress = (
      <BpkThemeProvider
        theme={{ progressBarFillColor: '#e02626' }}
        themeAttributes={[...progressThemeAttributes]}
      >
        {progress}
      </BpkThemeProvider>
    );
  } else if (predicted) {
    progress = (
      <BpkThemeProvider
        theme={{ progressBarFillColor: 'darkorchid' }}
        themeAttributes={[...progressThemeAttributes]}
      >
        {progress}
      </BpkThemeProvider>
    );
  } else {
    progress = (
      <BpkThemeProvider
        theme={{ progressBarFillColor: '#44aeff' }}
        themeAttributes={[...progressThemeAttributes]}
      >
        {progress}
      </BpkThemeProvider>
    );
  }

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      <span className={getClassName('degree-module--module-name')}>{name}</span>
      <div className={getClassName('degree-module--module-bar')}>
        {progress}
        {markerPosition && (
          <div
            className={getClassName('degree-module--21-marker')}
            style={{ marginLeft: `calc(${markerPosition}% - .175rem)` }}
          />
        )}
      </div>
      <span
        className={getClassName('degree-module--percentage')}
        style={{ opacity: filled && percentage && percentage > 0.01 ? 1 : 0 }}
      >
        {`${percentage || '00'}%`}
      </span>
    </span>
  );
};

DegreeModule.propTypes = {
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  predicted: PropTypes.bool,
  minimum: PropTypes.bool,
  filled: PropTypes.bool,
  className: PropTypes.string,
  markerPosition: PropTypes.number,
};

DegreeModule.defaultProps = {
  filled: false,
  predicted: false,
  minimum: false,
  className: null,
  percentage: null,
  markerPosition: null,
};

export default DegreeModule;
