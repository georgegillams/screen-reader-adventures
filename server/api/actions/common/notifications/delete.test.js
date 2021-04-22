#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import deleteNotification from './delete.js';

import { dbCreate, dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
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

  return dbCreate({ redisKey: 'notifications' }, { body: notification1 }).then(() =>
    dbCreate({ redisKey: 'notifications' }, { body: notification2 })
  );
};

test('delete notification as admin - removes data from collection', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'notification1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteNotification(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'notifications' }))
    .then(notifications => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].id).toBe('notification2');
      return true;
    });
});

test('delete non-existent notification as admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'notificationNotExists',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteNotification(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('delete notification non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'notification1',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteNotification(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'notifications',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('notification1');
        return true;
      })
    );
});

test('delete notification unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'notification1',
    },
  };

  return createSomeValues()
    .then(() => deleteNotification(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({
        redisKey: 'notifications',
      }).then(dbResult => {
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].id).toBe('notification1');
        return true;
      })
    );
});
