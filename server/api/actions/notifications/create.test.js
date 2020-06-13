#!/usr/bin/env node

import create from './create.js';

import { AuthError } from 'utils/errors';
import {
  clearDatabaseCollection,
  createUsersWithSessions,
} from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('notifications');
});

test('create notification as admin - adds data to collection', () => {
  const req = {
    cookies: { session: 'adminSessionKey1' },
    headers: {},
    body: {
      type: 'error',
      message: 'Test notification 1',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(result => {
      expect(result).toBeTruthy();
      expect(result.type).toBe('error');
      expect(result.message).toBe('Test notification 1');
      return true;
    });
});

test('create notification non-admin - throws auth error', () => {
  const req = {
    cookies: { session: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      type: 'error',
      message: 'Test notification 1',
    },
  };

  return createUsersWithSessions()
    .then(() => create(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});

test('create notification unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {
      type: 'error',
      message: 'Test notification 1',
    },
  };

  return create(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
    });
});
