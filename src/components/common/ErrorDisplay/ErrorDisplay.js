import React from 'react';
import PropTypes from 'prop-types';
import { Error } from 'gg-components/Error';
import { Paragraph } from 'gg-components/Paragraph';

const ErrorDisplay = props => {
  const { error, message, children, ...rest } = props;

  if (!error) {
    return null;
  }

  const showMessage = !!message;
  const showError = error && error.errorMessage;
  const showChildren = !!children;

  return (
    <Paragraph {...rest}>
      <Error>
        {showMessage && message}
        {showMessage && showError && <br />}
        {showError && error.errorMessage}
        {showChildren && (
          <>
            <br />
            {children}
          </>
        )}
      </Error>
    </Paragraph>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string,
  error: PropTypes.shape({
    errorMessage: PropTypes.string,
  }),
  children: PropTypes.node,
};

ErrorDisplay.defaultProps = {
  message: null,
  error: false,
  children: null,
};

export default ErrorDisplay;
