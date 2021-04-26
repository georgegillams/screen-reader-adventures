#!/usr/bin/env node

import loadAll from './loadAll.js';

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import { dbCreate } from 'server-utils/common/database';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('notifications');
});

const createSomeValues = () => {
  const notification1 = {
    requestedId: 'notification1',
  };
  const notification2 = {
    requestedId: 'notification2',
  };
  const notification3 = {
    requestedId: 'notification3',
    deleted: true,
  };

  return dbCreate({ redisKey: 'notifications' }, { body: notification1 })
    .then(() => dbCreate({ redisKey: 'notifications' }, { body: notification2 }))
    .then(() => dbCreate({ redisKey: 'notifications' }, { body: notification3 }));
};

test('load notifications as admin - returns all values', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.notifications).toBeTruthy();
      expect(result.notifications.length).toBe(3);
      expect(result.notifications[0].id).toBe('notification1');
      expect(result.notifications[1].id).toBe('notification2');
      expect(result.notifications[2].id).toBe('notification3');
      return true;
    });
});

test('load notifications as non-admin - returns non-deleted values', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.notifications).toBeTruthy();
      expect(result.notifications.length).toBe(2);
      expect(result.notifications[0].id).toBe('notification1');
      expect(result.notifications[1].id).toBe('notification2');
      return true;
    });
});

test('load notifications unauthenticated - returns non-deleted values', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadAll(req))
    .then(result => {
      expect(result.notifications).toBeTruthy();
      expect(result.notifications.length).toBe(2);
      expect(result.notifications[0].id).toBe('notification1');
      expect(result.notifications[1].id).toBe('notification2');
      return true;
    });
});
