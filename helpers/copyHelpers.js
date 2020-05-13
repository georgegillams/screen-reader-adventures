import getCopyWithOptions from './copy';
import { getPlatform } from './storageHelpers';

const getCopy = copyId => {
  const copy = getCopyWithOptions({});

  const platform = getPlatform();
  const copyForId = copy[copyId];
  if (!copyForId) {
    return copyId;
  }

  const result = copyForId[platform];
  if (!result) {
    return copyId;
  }

  return copy[copyId][platform];
};

export { getCopy };
export default {
  getCopy,
};
