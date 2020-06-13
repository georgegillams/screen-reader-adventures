import actionDefinitions from './actionDefinitions';

import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'utils/redux-definitions/constants';

module.exports = defineConstants(
  ...inferConstantsFromActionDefinitions(actionDefinitions),
);
