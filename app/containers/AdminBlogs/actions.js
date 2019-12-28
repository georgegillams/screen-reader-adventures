import constants from './constants';
import actionDefinitions from './actionDefinitions';

import defineActions, { populateConstants } from 'helpers/redux/actions';

module.exports = defineActions(populateConstants(actionDefinitions, constants));
