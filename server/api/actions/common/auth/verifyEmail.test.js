#!/usr/bin/env node

import verifyEmail from './verifyEmail.js';

import { dbCreate, dbLoad } from 'server-utils/common/database';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';
import { AuthError } from 'server-utils/common/errors';

beforeEach(() => {
  clearDatabaseCollection('emailVerificationCodes');
  clearDatabaseCollection('users');
});

const createSomeValues = () => {
  const emailVerificationCode1 = {
    key: 'emailVerificationKey1',
    userId: 'adminUser1',
    expiry: new Date(Date.now() + 60 * 60),
  };

  const emailVerificationCode2 = {
    key: 'emailVerificationKey2',
    userId: 'nonAdminUser1',
    expiry: new Date(Date.now() + 60 * 60),
  };

  const emailVerificationCode3 = {
    key: 'emailVerificationKey3',
    userId: 'test3',
    expiry: new Date(Date.now() + 60 * 60),
  };

  return dbCreate({ redisKey: 'emailVerificationCodes' }, { body: emailVerificationCode1 })
    .then(() => dbCreate({ redisKey: 'emailVerificationCodes' }, { body: emailVerificationCode2 }))
    .then(() => dbCreate({ redisKey: 'emailVerificationCodes' }, { body: emailVerificationCode3 }));
};

test('verify email with non-existent code - throws error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { verificationKey: 'emailVerificationKeyDoesNotExist' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => verifyEmail(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err.message).toBe('Invalid verification link');
    });
});

test('successful verification - sets code expiry to 0', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { verificationKey: 'emailVerificationKey2' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => verifyEmail(req))
    .then(() => dbLoad({ redisKey: 'emailVerificationCodes' }))
    .then(codes => {
      expect(codes.length).toBe(3);
      expect(codes[1].expiry).toBe(0);
      return true;
    })
    .then(() => dbLoad({ redisKey: 'users' }))
    .then(users => {
      expect(users.length).toBe(2);
      expect(users[1].emailVerified).toBe(true);
      return true;
    });
});

test('verify email with expired code - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { verificationKey: 'emailVerificationKey1' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => verifyEmail(req))
    .then(() => verifyEmail(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err.message).toBe('Email verification link has expired');
    });
});

test('verify email with code not matching user - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { verificationKey: 'emailVerificationKey3' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => verifyEmail(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err.message).toBe('Invalid user');
    });
});
