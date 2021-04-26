import dbLoad from './dbLoad';

import { RESOURCE_NOT_FOUND } from 'server-utils/common/errorConstants';

export default function dbLoadSingle(settings) {
  // loads values using settings
  // returns first result
  // if no result, throws error OR returns null
  return dbLoad(settings).then(values => {
    if (values.length > 0) {
      return values[0];
    }
    if (settings.resolveIfNotFound) {
      return null;
    }
    throw RESOURCE_NOT_FOUND;
  });
}
