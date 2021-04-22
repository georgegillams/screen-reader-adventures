#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import loadAll from './loadAll.js';
import resend from './resend.js';

import { dbCreate } from 'server-utils/common/database';
import { AuthError, NotFoundError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('analytics');
});

const createSomeValues = () => {
  const email1 = {
    requestedId: 'email1',
    from: 'from@example.com',
    to: 'to@example.com',
    body: '<email>stuff</email>',
  };

  const email2 = {
    requestedId: 'email2',
    from: 'from2@example.com',
    to: 'to2@example.com',
    body: '<email>reminder</email>',
  };

  return dbCreate({ redisKey: 'emails' }, { body: email1 }).then(() =>
    dbCreate({ redisKey: 'emails' }, { body: email2 })
  );
};

test('resend email admin - returns ok', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: { id: 'email1' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => resend(req))
    .then(() => loadAll(req))
    .then(results => {
      expect(results.emails.length).toBe(3);
      expect(results.emails[0].from).toBe('from@example.com');
      expect(results.emails[0].to).toBe('to@example.com');
      expect(results.emails[2].from).toBe('from@example.com');
      expect(results.emails[2].to).toBe('to@example.com');
      return true;
    });
});

test('resend non-existent email admin', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: { id: 'emailX' },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => resend(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBe(true);
    });
});

test('resend email non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => resend(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
    });
});

test('resend email unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => resend(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
    });
});
