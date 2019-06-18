import { fromJS } from 'immutable';

import {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_ERROR,
  LOAD_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_ERROR,
  CREATE_NOTIFICATION,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_ERROR,
} from './constants';

const initialState = fromJS({
  notifications: null,
  loading: false,
  success: false,
  error: null,
  newNotification: null,
  notificationToDelete: null,
  deleting: false,
  deleteSuccess: false,
  deleteError: null,
  creating: false,
  createSuccess: false,
  createError: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return state.set('loading', true).set('error', false);
    case LOAD_NOTIFICATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('notifications', action.notifications);
    case LOAD_NOTIFICATIONS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case DELETE_NOTIFICATION:
      return state
        .set('notificationToDelete', action.notification)
        .set('deleting', true)
        .set('deleteError', false);
    case DELETE_NOTIFICATION_SUCCESS:
      return state.set('deleting', false).set('deleteSuccess', true);
    case DELETE_NOTIFICATION_ERROR:
      return state.set('deleting', false).set('deleteError', action.error);
    case CREATE_NOTIFICATION:
      return state
        .set('newNotification', action.newNotification)
        .set('creating', true)
        .set('createError', false);
    case CREATE_NOTIFICATION_SUCCESS:
      return state.set('creating', false).set('createSuccess', true);
    case CREATE_NOTIFICATION_ERROR:
      return state.set('creating', false).set('createError', action.error);
    default:
      return state;
  }
}

export default appReducer;
