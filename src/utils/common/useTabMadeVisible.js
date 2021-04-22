import { useEffect } from 'react';

const getBrowserApiKeys = () => {
  let hidden, visibilityChange;

  if (typeof document === 'undefined') {
    return { hidden, visibilityChange };
  }

  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  return { hidden, visibilityChange };
};

const useTabMadeVisible = action => {
  if (typeof document === 'undefined') {
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const { hidden, visibilityChange } = getBrowserApiKeys();

    if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
      // browser does not support events or does not support the visibility API
      return;
    }

    const handleVisibilityChange = () => {
      if (!document[hidden]) {
        action();
      }
    };

    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    const cleanUp = () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
    return cleanUp;
  }, []);
};

export default useTabMadeVisible;
export { useTabMadeVisible };
