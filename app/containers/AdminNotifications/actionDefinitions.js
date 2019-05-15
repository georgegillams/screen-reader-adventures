const actionDefinitions = [
  {
    LOAD_NOTIFICATIONS: 'tbd',
    attributes: [],
  },
  {
    LOAD_NOTIFICATIONS_SUCCESS: 'tbd',
    attributes: ['notifications'],
  },
  {
    LOAD_NOTIFICATIONS_ERROR: 'tbd',
    attributes: ['error'],
  },
  {
    CREATE_NOTIFICATION: 'tbd',
    attributes: ['newNotification'],
  },
  {
    CREATE_NOTIFICATION_SUCCESS: 'tbd',
    attributes: [],
  },
  {
    CREATE_NOTIFICATION_ERROR: 'tbd',
    attributes: ['createError'],
  },
  {
    DELETE_NOTIFICATION: 'tbd',
    attributes: ['notification'],
  },
  {
    DELETE_NOTIFICATION_SUCCESS: 'tbd',
    attributes: [],
  },
  {
    DELETE_NOTIFICATION_ERROR: 'tbd',
    attributes: ['error'],
  },
];

export default actionDefinitions;
