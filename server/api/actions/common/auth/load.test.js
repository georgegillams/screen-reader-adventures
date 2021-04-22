#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import load from './load.js';

import { dbCreate } from 'server-utils/common/database';
import { clearDatabaseCollection } from 'server-utils/common/testUtils';

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

  const user3 = {
    requestedId: 'test3',
    name: 'Test Three',
    uname: 'test3',
    email: 'test3@example.com',
    emailVerified: true,
    admin: true,
  };

  return dbCreate({ redisKey: 'users' }, { body: user1 })
    .then(createdUser =>
      dbCreate(
        { redisKey: 'sessions' },
        { body: { userId: createdUser.id, sessionKey: 'sessionKey1', expiry: Date.now() + 10000 } }
      )
    )
    .then(() => dbCreate({ redisKey: 'users' }, { body: user2 }))
    .then(createdUser =>
      dbCreate(
        { redisKey: 'sessions' },
        { body: { userId: createdUser.id, sessionKey: 'sessionKey2', expiry: Date.now() + 10000 } }
      )
    )
    .then(() => dbCreate({ redisKey: 'users' }, { body: user3 }))
    .then(createdUser =>
      dbCreate(
        { redisKey: 'sessions' },
        { body: { userId: createdUser.id, sessionKey: 'expiredSessionKey3', expiry: Date.now() - 10000 } }
      )
    );
};

test('load auth with no session - returns null user', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => load(req))
    .then(result => {
      expect(result.user).toBe(null);
      return true;
    });
});

test('load auth with session - returns authenticated user', () => {
  const req1 = {
    cookies: { [SESSION_COOKIE_KEY]: 'sessionKey1' },
    headers: {},
    body: {},
  };
  const req2 = {
    cookies: { [SESSION_COOKIE_KEY]: 'sessionKey2' },
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => load(req1))
    .then(result => {
      expect(result.user).toBeTruthy();
      expect(result.user.id).toBe('test1');
      return true;
    })
    .then(() => load(req2))
    .then(result => {
      expect(result.user).toBeTruthy();
      expect(result.user.id).toBe('test2');
      return true;
    });
});

test('load auth with expired session - returns null', () => {
  const req1 = {
    cookies: { [SESSION_COOKIE_KEY]: 'expiredSessionKey3' },
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => load(req1))
    .then(result => {
      expect(result.user).toBe(null);
      return true;
    });
});
