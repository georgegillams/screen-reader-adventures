import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import { withRouter } from 'react-router-dom';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const PageContainer = props => {
  const { className, location, history, match, ...rest } = props;
  const [showDebug, setShowDebug] = useState(false);
  const didMountRef = useRef(false);
  let shouldMakeSelection = false;

  const selectAutoSelectComponentIfExists = () => {
    if (!shouldMakeSelection) {
      return;
    }

    const autoFocusElement = document.getElementById('autoFocus');
    console.log(`autoFocusElement`, autoFocusElement);
    if (autoFocusElement) {
      shouldMakeSelection = false;
      // tabindex -1 ensures that the element is programatically focusable
      autoFocusElement.tabIndex = -1;
      autoFocusElement.focus();
      // tabindex null reverts the state to unfocusable
      autoFocusElement.tabIndex = null;
    }
  };

  useEffect(() => {
    const hashIsEmpty = !props.location.hash;
    let componentWasAlreadyMounted = false;

    if (didMountRef.current) {
      componentWasAlreadyMounted = true;
    } else {
      didMountRef.current = true;
    }

    if (componentWasAlreadyMounted && hashIsEmpty) {
      shouldMakeSelection = true;
      selectAutoSelectComponentIfExists();
    }
  }, [props.location]);

  useEffect(() => {
    selectAutoSelectComponentIfExists();
  }, [props.children]);

  useEffect(
    () =>
      setShowDebug(
        window.localStorage.getItem('showPageContainerDebugColor') === 'true',
      ),
    [],
  );

  const outerClassNames = [getClassName('pages__container')];
  if (showDebug) {
    outerClassNames.push([getClassName('pages__container--debug')]);
  }

  if (className) {
    outerClassNames.push(className);
  }

  return <main className={outerClassNames.join(' ')} {...rest} />;
};

PageContainer.propTypes = {
  className: PropTypes.string,
};

PageContainer.defaultProps = {
  className: null,
};

export default withRouter(PageContainer);
