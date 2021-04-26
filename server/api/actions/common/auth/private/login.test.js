#!/usr/bin/env node

import login from './login.js';

import { dbLoad } from 'server-utils/common/database';
import { clearDatabaseCollection } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('sessions');
});

test('login - creates session and assigns user', () => {
  const userProfile = {
    id: 'testUserId1',
    uname: 'testUser',
    name: 'Test User',
  };

  return login(userProfile)
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'sessions', includeOwnerUname: true }))
    .then(results => {
      expect(results.length).toBe(1);
      expect(results[0].userId).toBe('testUserId1');
      expect(results[0].sessionKey).toBeTruthy();
      return true;
    })
    .catch(err => {
      throw err;
    });
});

test('login - creates random sessionKey', () => {
  const userProfile1 = {
    id: 'testUserId1',
    uname: 'testUser1',
    name: 'Test User 1',
  };

  const userProfile2 = {
    id: 'testUserId2',
    uname: 'testUser2',
    name: 'Test User 2',
  };

  return login(userProfile1)
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => login(userProfile2))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'sessions', includeOwnerUname: true }))
    .then(results => {
      expect(results.length).toBe(2);
      expect(results[0].userId).toBe('testUserId1');
      expect(results[1].userId).toBe('testUserId2');
      expect(results[0].sessionKey === results[1].sessionKey).toBe(false);
      return true;
    })
    .catch(err => {
      throw err;
    });
});
