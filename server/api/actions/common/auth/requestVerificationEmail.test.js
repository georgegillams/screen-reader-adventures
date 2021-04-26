#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import requestVerificationEmail from './requestVerificationEmail.js';

import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';
import { AuthError } from 'server-utils/common/errors';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

beforeEach(() => {
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('users');
});

test('request verification email unauthenticated - throws error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => requestVerificationEmail(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
      expect(err).toBe(UNAUTHORISED_WRITE);
    });
});

test('request verification email authenticated - returns OK', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => requestVerificationEmail(req))
    .then(result => {
      expect(result.success).toBeTruthy();
      expect(result.success).toBe('Verification email resent');
      return true;
    });
});
