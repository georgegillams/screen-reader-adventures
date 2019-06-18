import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import BpkProgress, {
  themeAttributes as progressThemeAttributes,
} from 'bpk-component-progress';
import BpkThemeProvider from 'bpk-theming';
import { cssModules } from 'bpk-react-utils';

import STYLES from './money-pot.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const MoneyPot = props => {
  const {
    name,
    minimum,
    predicted,
    markerPosition,
    shortfall,
    balance,
    goalAmount,
    percentage,
    filled,
    className,
    ...rest
  } = props;

  const classNameFinal = [getClassName('money-pot')];
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

  if (shortfall) {
    progress = (
      <BpkThemeProvider
        theme={{ progressBarFillColor: '#e02626' }}
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
      <span className={getClassName('money-pot--module-name')}>{name}</span>
      {balance !== null && (
        <span className={getClassName('money-pot--module-name')}>
          {`£${balance}`}
          {goalAmount !== null ? ` of £${goalAmount}` : ''}
        </span>
      )}
      <div className={getClassName('money-pot--module-bar')}>
        {progress}
        {markerPosition !== undefined && (
          <div
            className={getClassName('money-pot--21-marker')}
            style={{ marginLeft: `calc(${markerPosition}% - .175rem)` }}
          />
        )}
      </div>
      <span
        className={getClassName('money-pot--percentage')}
        style={{ opacity: filled && percentage && percentage > 0.01 ? 1 : 0 }}
      >{`${percentage || '00'}%`}</span>
    </span>
  );
};

MoneyPot.propTypes = {
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  shortfall: PropTypes.number,
  balance: PropTypes.number,
  goalAmount: PropTypes.number,
  predicted: PropTypes.bool,
  minimum: PropTypes.bool,
  filled: PropTypes.bool,
  className: PropTypes.string,
  markerPosition: PropTypes.number,
};

MoneyPot.defaultProps = {
  filled: false,
  predicted: false,
  shortfall: null,
  balance: null,
  goalAmount: null,
  minimum: false,
  className: null,
  percentage: null,
  markerPosition: null,
};

export default MoneyPot;
