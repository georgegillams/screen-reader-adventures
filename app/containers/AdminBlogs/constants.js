import defineConstants, {
  inferConstantsFromActionDefinitions,
} from 'helpers/redux/constants';
import actionDefinitions from './actionDefinitions';

module.exports = defineConstants(
  ...inferConstantsFromActionDefinitions(actionDefinitions),
);
