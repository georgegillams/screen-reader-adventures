import { createSelector } from 'reselect';

const selectNotifications = state => state.get('notifications');

const makeSelectNotifications = () =>
  createSelector(
    selectNotifications,
    notificationsState => notificationsState.get('data'),
  );

const makeSelectNotificationsLoading = () =>
  createSelector(
    selectNotifications,
    notificationsState => notificationsState.get('loading'),
  );

const makeSelectNotificationsError = () =>
  createSelector(
    selectNotifications,
    notificationsState => notificationsState.get('error'),
  );

export {
  selectNotifications,
  makeSelectNotifications,
  makeSelectNotificationsLoading,
  makeSelectNotificationsError,
};
