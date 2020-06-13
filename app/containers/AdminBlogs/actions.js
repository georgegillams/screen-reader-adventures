import constants from './constants';
import actionDefinitions from './actionDefinitions';

import defineActions, {
  populateConstants,
} from 'utils/redux-definitions/actions';

module.exports = defineActions(populateConstants(actionDefinitions, constants));
