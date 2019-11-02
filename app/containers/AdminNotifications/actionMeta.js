const actionMeta = {
  key: 'adminNotifications',
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
    {
      CREATE_NOTIFICATION: 'tbd',
      attributes: ['newNotification'],
      stateMutations: {
        newNotification: action => action.newNotification,
        creatingNotification: true,
        createNotificationError: null,
      },
    },
    {
      CREATE_NOTIFICATION_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        creatingNotification: false,
        createNotificationSuccess: true,
      },
    },
    {
      CREATE_NOTIFICATION_REGISTER_ERROR: 'tbd',
      attributes: ['createNotificationError'],
      stateMutations: {
        creatingNotification: false,
        createNotificationSuccess: false,
        createNotificationError: action => action.createNotificationError,
      },
    },
    {
      DELETE_NOTIFICATION: 'tbd',
      attributes: ['notificationToDelete'],
      stateMutations: {
        notificationToDelete: action => action.notificationToDelete,
        deletingNotification: true,
        deleteNotificationError: null,
      },
    },
    {
      DELETE_NOTIFICATION_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        deletingNotification: false,
        deleteNotificationSuccess: true,
      },
    },
    {
      DELETE_NOTIFICATION_REGISTER_ERROR: 'tbd',
      attributes: ['deleteNotificationError'],
      stateMutations: {
        deletingNotification: false,
        deleteNotificationSuccess: false,
        deleteNotificationError: action => action.deleteNotificationError,
      },
    },
  ],
};

export default actionMeta;
