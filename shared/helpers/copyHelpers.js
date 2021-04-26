import getCopyWithOptions from './copy';

import { getPlatform, getVOKey, getTouchBar } from 'utils/storageHelpers';

const getCopy = copyId => {
  if (typeof localStorage === 'undefined') {
    return 'Loading....';
  }

  const VOKey = getVOKey();
  const platform = getPlatform() || 'macOS';
  const touchBar = getTouchBar() || 'touchBar';

  const copyOptions = {};
  if (VOKey) {
    copyOptions.VOKey = VOKey;
  }

  const copy = getCopyWithOptions(copyOptions);

  const copyForId = copy[copyId];
  if (!copyForId) {
    return copyId;
  }

  let result = copyForId[platform];
  if (!result) {
    return copyId;
  }

  if (result.touchBar && result.noTouchBar) {
    result = touchBar === 'touchBar' ? result.touchBar : result.noTouchBar;
  }

  return result;
};

export { getCopy };
export default {
  getCopy,
};
