import appConfig from 'helpers/appConfig';

const GET = 'GET';
const POST = 'POST';

const apiStructure = {
  // Analytics
  createAnalytic: { method: POST, path: '/analytics/create' },
  loadAnalytics: { method: GET, path: '/analytics/load-all' },
  loadAnalyticsSummary: { method: GET, path: '/analytics/load' },

  // Auth
  loadAuth: { method: GET, path: '/auth/load' },
  logout: { method: POST, path: '/auth/logout' },
  requestVerificationEmail: {
    method: POST,
    path: '/auth/request-verification-email',
  },
  verifyEmail: { method: POST, path: '/auth/verify-email' },

  // Login
  loginWithMagicLink: { method: POST, path: '/magic-links/login' },
  requestMagicLink: { method: POST, path: '/magic-links/request' },

  // Data
  backupAllData: { method: GET, path: '/data-management/backup' },
  deleteEntity: { method: POST, path: '/data-management/delete-entity' },
  deleteSet: { method: POST, path: '/data-management/delete-set' },
  restoreBackup: { method: POST, path: '/data-management/restore' },

  // Notifications
  createNotification: { method: POST, path: '/notifications/create' },
  deleteNotification: { method: POST, path: '/notifications/delete' },
  loadNotifications: { method: GET, path: '/notifications/load-all' },
  loadNotification: { method: GET, path: '/notifications/load/:id' },
  updateNotification: { method: POST, path: '/notifications/update' },

  // Users
  createUser: { method: POST, path: '/users/create' },
  deleteUser: { method: POST, path: '/users/delete' },
  loadUser: { method: GET, path: '/users/load' },
  loadUsers: { method: GET, path: '/users/load-all' },
  signUp: { method: POST, path: '/users/sign-up' },
  updateUser: { method: POST, path: '/users/update' },
};

Object.keys(apiStructure).forEach(key => {
  apiStructure[
    key
  ].fullPath = `${appConfig.apiEndpoint}${apiStructure[key].path}`;
});

export default apiStructure;
