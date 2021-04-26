#!/usr/bin/env node

import login from './login.js';

import { dbCreate, dbLoad } from 'server-utils/common/database';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';
import { InvalidInputError } from 'server-utils/common/errors';

beforeEach(() => {
  clearDatabaseCollection('magiclinks');
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
});

const createSomeValues = () => {
  const magicLink1 = {
    key: 'magicLinkKey1',
    userId: 'adminUser1',
    expiry: new Date(Date.now() + 60 * 60),
  };

  const magicLink2 = {
    key: 'magicLinkKey2',
    userId: 'nonAdminUser1',
    expiry: new Date(Date.now() + 60 * 60),
  };

  const magicLink3 = {
    key: 'magicLinkKey3',
    userId: 'test3',
    expiry: new Date(Date.now() + 60 * 60),
  };

  return dbCreate({ redisKey: 'magiclinks' }, { body: magicLink1 })
    .then(() => dbCreate({ redisKey: 'magiclinks' }, { body: magicLink2 }))
    .then(() => dbCreate({ redisKey: 'magiclinks' }, { body: magicLink3 }));
};

test('login with non-existent code - throws error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { magicLinkKey: 'magicLinkKeyDoesNotExist' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => login(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof InvalidInputError).toBe(true);
      expect(err.message).toBe('Invalid magic link');
    });
});

test('successful login - sets code expiry to 0 and creates session', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { magicLinkKey: 'magicLinkKey2' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => login(req))
    .then(() => dbLoad({ redisKey: 'magiclinks' }))
    .then(codes => {
      expect(codes.length).toBe(3);
      expect(codes[1].expiry).toBe(0);
      return true;
    })
    .then(() => dbLoad({ redisKey: 'sessions' }))
    .then(sessions => {
      expect(sessions.length).toBe(4);
      expect(sessions[2].userId).toBe('nonAdminUser1');
      return true;
    });
});

test('login with expired code - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { magicLinkKey: 'magicLinkKey1' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => login(req))
    .then(() => login(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof InvalidInputError).toBe(true);
      expect(err.message).toBe('Magic link has expired');
    });
});

test('login with code not matching user - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { magicLinkKey: 'magicLinkKey3' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => login(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof InvalidInputError).toBe(true);
      expect(err.message).toBe('The user who requested this magic link could not be found');
    });
});
