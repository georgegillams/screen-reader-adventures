import constants from './constants';
import actionMeta from './actionMeta';

import defineActions, {
  populateConstants,
} from 'utils/redux-definitions/actions';

const { actionDefinitions } = actionMeta;

module.exports = defineActions(populateConstants(actionDefinitions, constants));
