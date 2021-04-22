#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import update from './update.js';

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
    message: 'notification 1 message',
  };
  const notification2 = {
    requestedId: 'notification2',
    message: 'notification 2 message',
  };

  return dbCreate({ redisKey: 'notifications' }, { body: notification1 }).then(() =>
    dbCreate({ redisKey: 'notifications' }, { body: notification2 })
  );
};

test('update notification as admin - updates data', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'notification1',
      message: 'Edited message',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => update(req))
    .then(result => {
      expect(result).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'notifications' }))
    .then(notifications => {
      expect(notifications.length).toBe(2);
      expect(notifications[0].id).toBe('notification1');
      expect(notifications[0].message).toBe('Edited message');
      expect(notifications[1].id).toBe('notification2');
      expect(notifications[1].message).toBe('notification 2 message');
      return true;
    });
});

test('update non-existent notification as admin - throws not found error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      id: 'notificationNotExists',
      message: 'Edited message',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => update(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    });
});

test('update notification non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      id: 'notification1',
      message: 'Edited message',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => update(req))
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
        expect(dbResult[0].id).toBe('notification1');
        expect(dbResult[0].message).toBe('notification 1 message');
        return true;
      })
    );
});

test('update notification unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      id: 'notification1',
      message: 'Edited message',
    },
  };

  return createSomeValues()
    .then(() => update(req))
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
        expect(dbResult[0].id).toBe('notification1');
        expect(dbResult[0].message).toBe('notification 1 message');
        return true;
      })
    );
});
