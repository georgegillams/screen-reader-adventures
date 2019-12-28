const actionMeta = {
  key: 'notifications',
  actionDefinitions: [
    {
      LOAD_NOTIFICATIONS: 'tbd',
      attributes: [],
      stateMutations: {
        loadingNotifications: true,
        loadNotificationsError: null,
      },
    },
    {
      LOAD_NOTIFICATIONS_REGISTER_SUCCESS: 'tbd',
      attributes: ['notifications'],
      stateMutations: {
        loadingNotifications: false,
        loadNotificationsSuccess: true,
        notifications: action => action.notifications,
      },
    },
    {
      LOAD_NOTIFICATIONS_REGISTER_ERROR: 'tbd',
      attributes: ['loadNotificationsError'],
      stateMutations: {
        loadingNotifications: false,
        loadNotificationsSuccess: false,
        loadNotificationsError: action => action.loadNotificationsError,
      },
    },
  ],
};

export default actionMeta;
