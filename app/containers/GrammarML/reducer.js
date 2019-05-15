import { fromJS } from 'immutable';
import {
  TEST,
  TEST_ERROR,
  TEST_SUCCESS,
  TEST_PERFORMANCE,
  TEST_PERFORMANCE_ERROR,
  TEST_PERFORMANCE_SUCCESS,
  LOAD_DATA,
  LOAD_DATA_ERROR,
  LOAD_DATA_SUCCESS,
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_ERROR,
  DELETE_ALL,
  DELETE_ALL_SUCCESS,
  DELETE_ALL_ERROR,
  CREATE_DATA,
  CREATE_DATA_SUCCESS,
  CREATE_DATA_ERROR,
} from './constants';

const initialState = fromJS({
  testData: null,
  data: null,
  result: null,
  loading: false,
  success: false,
  error: null,
  newData: null,
  dataToDelete: null,
  deleting: false,
  deleteSuccess: false,
  deleteError: null,
  deletingAll: false,
  deleteAllSuccess: false,
  deleteAllError: null,
  creating: false,
  createSuccess: false,
  createError: null,
  testingPerformance: false,
  testing: false,
  testSuccess: false,
  testError: null,
  testPerformanceSuccess: false,
  testPerformanceError: null,
  testParameters: null,
  performance: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return state
        .set('testData', action.testData)
        .set('testing', true)
        .set('testError', false)
        .set('result', null);
    case TEST_SUCCESS:
      return state
        .set('testing', false)
        .set('testSuccess', true)
        .set('result', action.result);
    case TEST_ERROR:
      return state.set('testing', false).set('testError', action.testError);
    case TEST_PERFORMANCE:
      return state
        .set('testParameters', action.testParameters)
        .set('testingPerformance', true)
        .set('testPerformanceError', false)
        .set('performance', null);
    case TEST_PERFORMANCE_SUCCESS:
      return state
        .set('testingPerformance', false)
        .set('testPerformanceSuccess', true)
        .set('performance', action.performance);
    case TEST_PERFORMANCE_ERROR:
      return state
        .set('testingPerformance', false)
        .set('testPerformanceError', action.testPerformanceError);
    case LOAD_DATA:
      return state.set('loading', true).set('error', false);
    case LOAD_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('data', action.data);
    case LOAD_DATA_ERROR:
      return state.set('loading', false).set('error', action.error);
    case DELETE_DATA:
      return state
        .set('dataToDelete', action.data)
        .set('deleting', true)
        .set('deleteError', false);
    case DELETE_DATA_SUCCESS:
      return state.set('deleting', false).set('deleteSuccess', true);
    case DELETE_DATA_ERROR:
      return state.set('deleting', false).set('deleteError', action.error);
    case DELETE_ALL:
      return state.set('deletingAll', true).set('deleteAllError', false);
    case DELETE_ALL_SUCCESS:
      return state.set('deletingAll', false).set('deleteAllSuccess', true);
    case DELETE_ALL_ERROR:
      return state
        .set('deletingAll', false)
        .set('deleteAllError', action.error);
    case CREATE_DATA:
      return state
        .set('newData', action.newData)
        .set('creating', true)
        .set('createError', false);
    case CREATE_DATA_SUCCESS:
      return state.set('creating', false).set('createSuccess', true);
    case CREATE_DATA_ERROR:
      return state.set('creating', false).set('createError', action.error);
    default:
      return state;
  }
}

export default appReducer;
