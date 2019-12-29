import constants from './constants';
import actionMeta from './actionMeta';

import defineActions, { populateConstants } from 'helpers/redux/actions';

const { actionDefinitions } = actionMeta;

module.exports = defineActions(populateConstants(actionDefinitions, constants));
