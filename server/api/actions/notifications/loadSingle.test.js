#!/usr/bin/env node

import loadSingle from './loadSingle.js';

import { dbCreate } from 'utils/database';
import { NotFoundError } from 'utils/errors';
import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

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
    deleted: true,
  };

  return dbCreate(
    { redisKey: 'notifications' },
    { body: notification1 },
  ).then(() =>
    dbCreate({ redisKey: 'notifications' }, { body: notification2 }),
  );
};

test('load deleted notification as admin - returns value', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'notification2' }))
    .then(notification => {
      expect(notification).toBeTruthy();
      expect(notification.id).toBe('notification2');
      return true;
    });
});

test('load deleted notification non-admin - throws not found error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'notification2' }))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('load deleted notification unauthenticated - throws not found error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'notification2' }))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('load notification as admin - returns value', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'notification1' }))
    .then(notification => {
      expect(notification).toBeTruthy();
      expect(notification.id).toBe('notification1');
      return true;
    });
});

test('load notification non-admin - returns value', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'notification1' }))
    .then(notification => {
      expect(notification).toBeTruthy();
      expect(notification.id).toBe('notification1');
      return true;
    });
});

test('load notification unauthenticated - returns value', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSingle(req, { id: 'notification1' }))
    .then(notification => {
      expect(notification).toBeTruthy();
      expect(notification.id).toBe('notification1');
      return true;
    });
});
