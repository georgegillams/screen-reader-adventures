#!/usr/bin/env node

import requestMagicLink from './requestMagicLink.js';

import { dbLoad } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';
import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('emails');
  clearDatabaseCollection('magiclinks');
});

test('request magic link for user - should succeed', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { email: 'nonAdminUser1@example.com' },
  };

  return createUsersWithSessions()
    .then(() => requestMagicLink(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.success).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'magiclinks' }))
    .then(magicLinks => {
      expect(magicLinks.length).toBe(1);
      expect(magicLinks[0].userId).toBe('nonAdminUser1');
      return true;
    })
    .then(() => dbLoad({ redisKey: 'emails' }))
    .then(emails => {
      expect(emails.length).toBe(1);
      expect(emails[0].to).toBe('nonAdminUser1@example.com');
      return true;
    });
});

test('request diverted magic link admin - should send email to admin account', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: { email: 'nonAdminUser1@example.com', divertToAdmin: true },
  };

  return createUsersWithSessions()
    .then(() => requestMagicLink(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.success).toBeTruthy();
      return true;
    })
    .then(() => dbLoad({ redisKey: 'magiclinks' }))
    .then(magicLinks => {
      expect(magicLinks.length).toBe(1);
      expect(magicLinks[0].userId).toBe('nonAdminUser1');
      return true;
    })
    .then(() => dbLoad({ redisKey: 'emails' }))
    .then(emails => {
      expect(emails.length).toBe(1);
      expect(emails[0].to.startsWith(`auth+diverted-to-admin@`)).toBeTruthy();
      return true;
    });
});

test('request diverted magic link non-admin - should throw auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: { email: 'nonAdminUser1@example.com', divertToAdmin: true },
  };

  return createUsersWithSessions()
    .then(() => requestMagicLink(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({ redisKey: 'magiclinks' })
        .then(magicLinks => {
          expect(magicLinks.length).toBe(0);
          return true;
        })
        .then(() => dbLoad({ redisKey: 'emails' }))
        .then(emails => {
          expect(emails.length).toBe(0);
          return true;
        })
    );
});

test('request magic link non-existent-user - should throw error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: { email: 'nonExistent@example.com' },
  };

  return createUsersWithSessions()
    .then(() => requestMagicLink(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
    })
    .finally(() =>
      dbLoad({ redisKey: 'magiclinks' })
        .then(magicLinks => {
          expect(magicLinks.length).toBe(0);
          return true;
        })
        .then(() => dbLoad({ redisKey: 'emails' }))
        .then(emails => {
          expect(emails.length).toBe(0);
          return true;
        })
    );
});
