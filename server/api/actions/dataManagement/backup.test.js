#!/usr/bin/env node

import backup from './backup.js';

import { AuthError } from 'utils/errors';
import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('blogs');
});

test('backup as admin - should return ', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  const mockRes = { download: jest.fn(() => null) };

  return createUsersWithSessions()
    .then(() => backup(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(typeof result).toBe('function');
      result(mockRes);
      expect(mockRes.download.mock.calls.length).toBe(1);
      return true;
    });
});

test('backup non-admin - throws auth error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => backup(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('backup unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      name: 'testBlog',
      content: 'Blah blah',
    },
  };

  return backup(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});
