import actionDefinitions from './actionDefinitions';

import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'helpers/redux/constants';

module.exports = defineConstants(
  ...inferConstantsFromActionDefinitions(actionDefinitions),
);
