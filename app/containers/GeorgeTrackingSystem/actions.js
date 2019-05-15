import defineActions from 'helpers/redux/actions';
import {
  LOAD_GTS_LATEST,
  LOAD_GTS_LATEST_SUCCESS,
  LOAD_GTS_LATEST_ERROR,
} from './constants';

module.exports = defineActions([
  {
    LOAD_GTS_LATEST,
    attributes: [],
  },
  {
    LOAD_GTS_LATEST_SUCCESS,
    attributes: ['gtsLatest'],
  },
  {
    LOAD_GTS_LATEST_ERROR,
    attributes: ['error'],
  },
]);
