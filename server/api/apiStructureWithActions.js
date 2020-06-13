import originalApiStructure from 'helpers/apiStructure';

const apiStructure = JSON.parse(JSON.stringify(originalApiStructure));

// Analytics
apiStructure.createAnalytic.action = require('./actions/analytics/create');
apiStructure.loadAnalytics.action = require('./actions/analytics/loadAll');
apiStructure.loadAnalyticsSummary.action = require('./actions/analytics/loadSummary');

// Auth
apiStructure.loadAuth.action = require('./actions/auth/load');
apiStructure.logout.action = require('./actions/auth/logout');
apiStructure.requestVerificationEmail.action = require('./actions/auth/requestVerificationEmail');
apiStructure.verifyEmail.action = require('./actions/auth/verifyEmail');

// login
apiStructure.loginWithMagicLink.action = require('./actions/magicLinks/login');
apiStructure.requestMagicLink.action = require('./actions/magicLinks/requestMagicLink');

// Data
apiStructure.backupAllData.action = require('./actions/dataManagement/backup');
apiStructure.deleteEntity.action = require('./actions/dataManagement/deleteEntity');
apiStructure.deleteSet.action = require('./actions/dataManagement/deleteSet');
apiStructure.restoreBackup.action = require('./actions/dataManagement/restore');

// Notifications
apiStructure.createNotification.action = require('./actions/notifications/create');
apiStructure.deleteNotification.action = require('./actions/notifications/delete');
apiStructure.loadNotifications.action = require('./actions/notifications/loadAll');
apiStructure.loadNotification.action = require('./actions/notifications/loadSingle');
apiStructure.updateNotification.action = require('./actions/notifications/update');

// Users
apiStructure.createUser.action = require('./actions/users/create');
apiStructure.deleteUser.action = require('./actions/users/delete');
apiStructure.loadUser.action = require('./actions/users/loadSingle');
apiStructure.loadUsers.action = require('./actions/users/load');
apiStructure.signUp.action = require('./actions/users/signUp');
apiStructure.updateUser.action = require('./actions/users/update');

export default apiStructure;
