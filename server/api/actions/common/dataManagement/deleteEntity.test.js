#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import deleteEntity from './deleteEntity.js';

import { dbLoadSingle, dbCreate } from 'server-utils/common/database';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';
import { AuthError, NotFoundError } from 'server-utils/common/errors';

beforeEach(() => {
  clearDatabaseCollection('users');
  clearDatabaseCollection('sessions');
  clearDatabaseCollection('emails');
});

const createSomeValues = () => {
  const user5 = {
    requestedId: 'user5',
    name: 'User Five',
    deleted: true,
  };
  const email2 = {
    requestedId: 'email2',
    to: 'address@example.com',
    message: 'Hi',
  };

  return dbCreate({ redisKey: 'users' }, { body: user5 }).then(() =>
    dbCreate({ redisKey: 'emails' }, { body: email2 })
  );
};

test('remove deleted entity non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      collectionName: 'users',
      id: 'user5',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteEntity(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
      expect(err.message).toBe('You are not authorised to write to this resource');
    })
    .finally(() =>
      // ensure the attempted deletion has not changed data
      dbLoadSingle({
        redisKey: 'users',
        filter: x => x.id === 'user5',
        includeDeleted: true,
      }).then(dbResult => {
        expect(dbResult).toBeTruthy();
        expect(dbResult.id).toBe('user5');
        expect(dbResult.name).toBe('User Five');
        return true;
      })
    );
});

test('remove non-deleted entity admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {
      collectionName: 'emails',
      id: 'email2',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteEntity(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBeTruthy();
      expect(err.message).toBe('You are not authorised to write to this resource');
    })
    .finally(() =>
      // ensure the attempted deletion has not changed data
      dbLoadSingle({
        redisKey: 'emails',
        filter: u => u.id === 'email2',
      }).then(dbResult => {
        expect(dbResult).toBeTruthy();
        expect(dbResult.id).toBe('email2');
        return true;
      })
    );
});

test('remove non-existent entity admin - throws invalid input error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      collectionName: 'nonExistentCollection',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteEntity(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof NotFoundError).toBeTruthy();
      expect(err.message).toBe("We looked everywhere but we couldn't find that resource. Maybe you need to sign in.");
    })
    .finally(() =>
      // ensure the attempted deletion has not changed data
      dbLoadSingle({
        redisKey: 'emails',
        filter: u => u.id === 'email2',
      }).then(dbResult => {
        expect(dbResult).toBeTruthy();
        expect(dbResult.id).toBe('email2');
        return true;
      })
    );
});

test('remove deleted entity admin', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {
      collectionName: 'users',
      id: 'user5',
    },
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => deleteEntity(req))
    .then(() =>
      dbLoadSingle({
        redisKey: 'users',
        filter: u => u.id === 'user5',
        resolveIfNotFound: true,
      })
    )
    .then(dbResult => {
      expect(dbResult).toBe(null);
      return true;
    });
});
