import getCopyWithOptions from './copy';
import { getPlatform, getVOKey } from './storageHelpers';

const getCopy = copyId => {
  const VOKey = getVOKey();
  const platform = getPlatform() || 'macOS';

  const copyOptions = {};
  if (VOKey) {
    copyOptions.VOKey = VOKey;
  }

  const copy = getCopyWithOptions(copyOptions);

  const copyForId = copy[copyId];
  if (!copyForId) {
    return copyId;
  }

  const result = copyForId[platform];
  if (!result) {
    return copyId;
  }

  return result;
};

export { getCopy };
export default {
  getCopy,
};
