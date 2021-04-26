import originalApiStructure from 'helpers/common/apiStructure';
import { apiStructureWithActionsExtensions } from '../apiStructureWithActions_Extensions';

const apiStructure = JSON.parse(JSON.stringify(originalApiStructure));

// Analytics
apiStructure.createAnalytic.action = require('./analytics/create');
apiStructure.loadAnalytics.action = require('./analytics/loadAll');
apiStructure.loadAnalyticsSummary.action = require('./analytics/loadSummary');

// Auth
apiStructure.loadAuth.action = require('./auth/load');
apiStructure.logout.action = require('./auth/logout');
apiStructure.requestVerificationEmail.action = require('./auth/requestVerificationEmail');
apiStructure.verifyEmail.action = require('./auth/verifyEmail');

// Emails
apiStructure.loadEmails.action = require('./emails/loadAll');
apiStructure.resendEmail.action = require('./emails/resend');

// login
apiStructure.loginWithMagicLink.action = require('./magicLinks/login');
apiStructure.requestMagicLink.action = require('./magicLinks/requestMagicLink');

// Data
apiStructure.backupAllData.action = require('./dataManagement/backup');
apiStructure.deleteEntity.action = require('./dataManagement/deleteEntity');
apiStructure.deleteSet.action = require('./dataManagement/deleteSet');
apiStructure.restoreBackup.action = require('./dataManagement/restore');

// Notifications
apiStructure.createNotification.action = require('./notifications/create');
apiStructure.deleteNotification.action = require('./notifications/delete');
apiStructure.loadNotifications.action = require('./notifications/loadAll');
apiStructure.loadNotification.action = require('./notifications/loadSingle');
apiStructure.updateNotification.action = require('./notifications/update');

// Users
apiStructure.createUser.action = require('./users/create');
apiStructure.deleteUser.action = require('./users/delete');
apiStructure.loadUser.action = require('./users/loadSingle');
apiStructure.loadUsers.action = require('./users/load');
apiStructure.signUp.action = require('./users/signUp');
apiStructure.updateUser.action = require('./users/update');

apiStructureWithActionsExtensions(apiStructure);

export default apiStructure;
