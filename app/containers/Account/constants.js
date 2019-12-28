import actionMeta from './actionMeta';

const { actionDefinitions } = actionMeta;

import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'helpers/redux/constants';

module.exports = defineConstants(
  ...inferConstantsFromActionDefinitions(actionDefinitions),
);
