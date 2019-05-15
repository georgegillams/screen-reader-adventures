import {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_ERROR,
} from './constants';

export function loadNotifications() {
  return {
    type: LOAD_NOTIFICATIONS,
  };
}

export function notificationsLoaded(notifications) {
  return {
    type: LOAD_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

export function notificationLoadingError(error) {
  return {
    type: LOAD_NOTIFICATIONS_ERROR,
    error,
  };
}
