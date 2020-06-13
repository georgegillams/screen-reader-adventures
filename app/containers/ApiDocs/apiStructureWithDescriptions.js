import apiStructure from 'helpers/apiStructure';

// Analytics
apiStructure.createAnalytic.description =
  'Registers information about the page navigated to';
apiStructure.createAnalytic.authorisation = 'None';
apiStructure.loadAnalytics.description = 'Loads all raw analytic points';
apiStructure.loadAnalytics.authorisation = 'Admin only';
apiStructure.loadAnalyticsSummary.description =
  'Loads a summary of unique analytic points';
apiStructure.loadAnalyticsSummary.authorisation = 'Admin only';

// Auth
apiStructure.loadAuth.description =
  'Loads the currently authenticated used. Returns null if signed out';
apiStructure.loadAuth.authorisation = 'None';
apiStructure.logout.description = 'Logs out the currently authenticated user';
apiStructure.logout.authorisation = 'None';
apiStructure.requestVerificationEmail.description =
  'Resends an email verification email';
apiStructure.requestVerificationEmail.authorisation = 'Any user';
apiStructure.verifyEmail.description =
  'Verify an email address with a secret verification key';
apiStructure.verifyEmail.authorisation = 'None';

// Login
apiStructure.loginWithMagicLink.description =
  'Login using a secret magic-link key';
apiStructure.loginWithMagicLink.authorisation = 'None';
apiStructure.requestMagicLink.description =
  "Request a magic link for a given account using the account's email address";
apiStructure.requestMagicLink.authorisation = 'None';

// Data
apiStructure.backupAllData.description =
  'Returns a file containing a full data backup for the site';
apiStructure.backupAllData.authorisation = 'Admin only';
apiStructure.deleteEntity.description =
  'Remove a previously deleted entity completely from the DB';
apiStructure.deleteEntity.authorisation = 'Admin only';
apiStructure.deleteSet.description = 'Remove an entire collection from the DB';
apiStructure.deleteSet.authorisation = 'Admin only';
apiStructure.restoreBackup.description =
  'Restore all the data from a backup file';
apiStructure.restoreBackup.authorisation = 'Admin only';

// Notifications
apiStructure.createNotification.description = 'TODO';
apiStructure.createNotification.authorisation = 'TODO';
apiStructure.deleteNotification.description = 'TODO';
apiStructure.deleteNotification.authorisation = 'TODO';
apiStructure.loadNotifications.description = 'TODO';
apiStructure.loadNotifications.authorisation = 'TODO';
apiStructure.loadNotification.description = 'TODO';
apiStructure.loadNotification.authorisation = 'TODO';
apiStructure.loadNotification.arguments = 'TODO';
apiStructure.updateNotification.description = 'TODO';
apiStructure.updateNotification.authorisation = 'TODO';

// Users
apiStructure.createUser.description = 'TODO';
apiStructure.createUser.authorisation = 'TODO';
apiStructure.deleteUser.description = 'TODO';
apiStructure.deleteUser.authorisation = 'TODO';
apiStructure.loadUser.description = 'TODO';
apiStructure.loadUser.authorisation = 'TODO';
apiStructure.loadUsers.description = 'TODO';
apiStructure.loadUsers.authorisation = 'TODO';
apiStructure.signUp.description = 'TODO';
apiStructure.signUp.authorisation = 'TODO';
apiStructure.updateUser.description = 'TODO';
apiStructure.updateUser.authorisation = 'TODO';

export default apiStructure;
