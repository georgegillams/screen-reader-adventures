import copy from './copy.json';
import { getPlatform } from './storageHelpers';

const getCopy = copyId => {
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
