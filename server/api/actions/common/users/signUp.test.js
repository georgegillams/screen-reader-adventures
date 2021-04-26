#!/usr/bin/env node

import signUp from './signUp.js';

import { dbLoadSingle } from 'server-utils/common/database';
import { InvalidInputError } from 'server-utils/common/errors.js';

test('allows a user to be created', () => {
  const req = {
    headers: {},
    cookies: {},
    body: {
      uname: 'user1',
      email: 'test-user1@georgegillams.co.uk',
    },
  };

  let result = null;
  return signUp(req)
    .then(createdUser => {
      result = createdUser;

      expect(result.error).toBe(undefined);
      expect(result.errorMessage).toBe(undefined);
      expect(result.authorId).toBe(undefined);

      expect(result.email).toBe('test-user1@georgegillams.co.uk');
      expect(result.uname).toBe('user1');

      expect(result.id).toBeTruthy();
      expect(result.lastUpdatedTimestamp).toBeTruthy();
      expect(result.session).toBeTruthy();
      expect(result.timestamp).toBeTruthy();
      return true;
    })
    .then(() =>
      dbLoadSingle({
        redisKey: 'users',
        filter: u => u.id === result.id,
      })
    )
    .then(dbResult => {
      expect(dbResult.authorId).toBe(result.authorId);

      expect(dbResult.email).toBe(result.email);
      expect(dbResult.uname).toBe(result.uname);

      expect(dbResult.timestamp).toBe(result.timestamp);
      return true;
    });
  // TODO Test that new session is created too
});

test('returns error if username is taken', () => {
  const req = {
    headers: {},
    cookies: {},
    body: {
      uname: 'user1',
      email: 'test-user2@georgegillams.co.uk',
    },
  };

  return signUp(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(error => {
      expect(error instanceof InvalidInputError).toBe(true);
      expect(error.message).toBe(`A user with that username or email already exists`);
    });
});

test('returns error if email is taken', () => {
  const req = {
    headers: {},
    cookies: {},
    body: {
      uname: 'user2',
      email: 'test-user1@georgegillams.co.uk',
    },
  };

  return signUp(req)
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(error => {
      expect(error instanceof InvalidInputError).toBe(true);
      expect(error.message).toBe(`A user with that username or email already exists`);
    });
});
