#!/usr/bin/env node

import performRestoration from './performRestoration.js';

import { dbLoad, dbCreate } from 'server-utils/common/database';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('analytics');
});

const createSomeValues = () => {
  const analytic1 = {
    id: 'overwriteMe',
    browser: 'firefox',
  };

  return dbCreate({ redisKey: 'analytics' }, { body: analytic1 });
};

test('restore data - overwrites analytics without touching users', () => {
  const testRestoreData = {
    analytics: [
      {
        id: 'analytic1',
        browser: 'safari',
      },
    ],
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => performRestoration(testRestoreData))
    .then(() => dbLoad({ redisKey: 'users' }))
    .then(users => {
      expect(users.length).toBe(2);
      expect(users[0].id).toBe('adminUser1');
      expect(users[1].id).toBe('nonAdminUser1');
      return true;
    })
    .then(() => dbLoad({ redisKey: 'analytics' }))
    .then(analytics => {
      expect(analytics.length).toBe(1);
      expect(analytics[0].id).toBe('analytic1');
      return true;
    });
});
