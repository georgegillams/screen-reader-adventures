#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import logout from './logout.js';

import { dbCreate, dbLoad } from 'server-utils/common/database';
import { clearDatabaseCollection } from 'server-utils/common/testUtils';
import { AuthError } from 'server-utils/common/errors';
import { INVALID_SESSION } from 'server-utils/common/errorConstants';

beforeEach(() => {
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('users');
});

const createSomeValues = () => {
  const user1 = {
    requestedId: 'test1',
    name: 'Test One',
    uname: 'test1',
    email: 'test1@example.com',
    emailVerified: true,
    admin: false,
  };

  const user2 = {
    requestedId: 'test2',
    name: 'Test Two',
    uname: 'test2',
    email: 'test2@example.com',
    emailVerified: true,
    admin: true,
  };

  return dbCreate({ redisKey: 'users' }, { body: user1 })
    .then(createdUser =>
      dbCreate(
        { redisKey: 'sessions' },
        {
          body: {
            sessionKey: 'sessionKey1',
            userId: createdUser.id,
            userAuthenticatedTimestamp: 5,
          },
        }
      )
    )
    .then(() => dbCreate({ redisKey: 'users' }, { body: user2 }))
    .then(createdUser =>
      dbCreate(
        { redisKey: 'sessions' },
        {
          body: {
            sessionKey: 'sessionKey2',
            userId: createdUser.id,
            userAuthenticatedTimestamp: 5,
          },
        }
      )
    );
};

test('logout with no valid session - throws error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => logout(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err).toBe(INVALID_SESSION);
    });
});

test('logout with session - removes user from session', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'sessionKey2' },
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => dbLoad({ redisKey: 'sessions' }))
    .then(sessions => {
      expect(sessions.length).toBe(2);
      expect(sessions[0].userId).toBe('test1');
      expect(sessions[0].userAuthenticatedTimestamp).toBe(5);
      expect(sessions[1].userId).toBe('test2');
      expect(sessions[1].userAuthenticatedTimestamp).toBe(5);
      return true;
    })
    .then(() => logout(req))
    .then(result => {
      expect(result.success).toBeTruthy();
      expect(result.success).toBe('You are now logged out');
      return true;
    })
    .then(() => dbLoad({ redisKey: 'sessions' }))
    .then(sessions => {
      expect(sessions.length).toBe(2);
      expect(sessions[0].userId).toBe('test1');
      expect(sessions[0].userAuthenticatedTimestamp).toBe(5);
      expect(sessions[1].userId).toBe(null);
      expect(sessions[1].userAuthenticatedTimestamp).toBe(null);
      return true;
    });
});

test('duplicate logout - returns OK', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'sessionKey2' },
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => dbLoad({ redisKey: 'sessions' }))
    .then(() => logout(req))
    .then(() => logout(req))
    .then(result => {
      expect(result.success).toBeTruthy();
      expect(result.success).toBe('You are now logged out');
      return true;
    })
    .then(() => dbLoad({ redisKey: 'sessions' }))
    .then(sessions => {
      expect(sessions.length).toBe(2);
      expect(sessions[1].userId).toBe(null);
      expect(sessions[1].userAuthenticatedTimestamp).toBe(null);
      return true;
    });
});
