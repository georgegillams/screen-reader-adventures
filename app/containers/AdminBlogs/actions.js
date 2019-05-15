import defineActions, { populateConstants } from 'helpers/redux/actions';
import constants from './constants';
import actionDefinitions from './actionDefinitions';

module.exports = defineActions(populateConstants(actionDefinitions, constants));
