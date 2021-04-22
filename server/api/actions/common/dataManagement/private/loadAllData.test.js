#!/usr/bin/env node

import loadAllData from './loadAllData.js';

import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('analytics');
});

test('load all data - includes common data sets', () =>
  createUsersWithSessions()
    .then(() => loadAllData())
    .then(results => {
      expect(results.users).toBeTruthy();
      expect(results.analytics).toBeTruthy();
      expect(results.users.length).toBe(2);
      expect(results.users[0].id).toBe('adminUser1');
      expect(results.users[1].id).toBe('nonAdminUser1');
      expect(results.aardvarks).toBe(undefined);
      return true;
    }));
