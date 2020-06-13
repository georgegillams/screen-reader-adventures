import actionMeta from './actionMeta';

const { actionDefinitions } = actionMeta;

import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'utils/redux-definitions/constants';

module.exports = defineConstants(
  ...inferConstantsFromActionDefinitions(actionDefinitions),
);
