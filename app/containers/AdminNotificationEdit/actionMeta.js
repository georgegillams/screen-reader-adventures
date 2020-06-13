const actionMeta = {
  key: 'notification_edit',
  actionDefinitions: [
    {
      LOAD_NOTIFICATION: 'tbd',
      attributes: ['notificationId'],
      stateMutations: {
        loadingNotification: true,
        loadNotificationError: null,
        notificationId: action => action.notificationId,
      },
    },
    {
      LOAD_NOTIFICATION_REGISTER_SUCCESS: 'tbd',
      attributes: ['notification'],
      stateMutations: {
        loadingNotification: false,
        loadNotificationSuccess: true,
        notification: action => action.notification,
      },
    },
    {
      LOAD_NOTIFICATION_REGISTER_ERROR: 'tbd',
      attributes: ['loadNotificationError'],
      stateMutations: {
        loadingNotification: false,
        loadNotificationError: action => action.loadNotificationError,
      },
    },
    {
      UPDATE_NOTIFICATION: 'tbd',
      attributes: ['newNotification', 'onUpdateNotificationRegisterSuccess'],
      stateMutations: {
        updatingNotification: true,
        updateNotificationError: null,
        newNotification: action => action.newNotification,
        onUpdateNotificationRegisterSuccess: action =>
          action.onUpdateNotificationRegisterSuccess,
      },
    },
    {
      UPDATE_NOTIFICATION_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        updatingNotification: false,
        updateNotificationSuccess: true,
        onUpdateNotificationRegisterSuccess: null,
      },
    },
    {
      UPDATE_NOTIFICATION_REGISTER_ERROR: 'tbd',
      attributes: ['updateNotificationError'],
      stateMutations: {
        updatingNotification: false,
        updateNotificationError: action => action.updateNotificationError,
        onUpdateNotificationRegisterSuccess: null,
      },
    },
  ],
};

export default actionMeta;
