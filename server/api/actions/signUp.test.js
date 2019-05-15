#!/usr/bin/env node

import signUp from './signUp.js';
import { datumLoadSingle } from './datum';

test('allows a user to be created', done => {
  const req = {
    body: {
      uname: 'user1',
      email: 'test-user1@georgegillams.co.uk',
    },
  };
  signUp(req).then(result => {
    expect(result.error).toBe(undefined);
    expect(result.authorId).toBe(undefined);

    expect(result.email).toBe('test-user1@georgegillams.co.uk');
    expect(result.uname).toBe('user1');

    expect(result.id).toBeTruthy();
    expect(result.lastUpdatedTimestamp).toBeTruthy();
    expect(result.session).toBeTruthy();
    expect(result.timestamp).toBeTruthy();

    datumLoadSingle({
      redisKey: 'users',
      filter: u => u.id === result.id,
    }).then(dbResult => {
      expect(dbResult.authorId).toBe(result.authorId);

      expect(dbResult.email).toBe(result.email);
      expect(dbResult.uname).toBe(result.uname);

      expect(dbResult.timestamp).toBe(result.timestamp);
      done();
    });
  });
});

test('returns error if username is taken', done => {
  const req = {
    body: {
      uname: 'user1',
      email: 'test-user2@georgegillams.co.uk',
    },
  };
  signUp(req).then(result => {
    expect(result.error).toBe(`Username already taken.`);

    expect(result.authorId).toBe(undefined);
    expect(result.email).toBe(undefined);
    expect(result.uname).toBe(undefined);
    expect(result.id).toBe(undefined);
    expect(result.lastUpdatedTimestamp).toBe(undefined);
    expect(result.session).toBe(undefined);
    expect(result.timestamp).toBe(undefined);
    done();
  });
});

test('returns error if email is taken', done => {
  const req = {
    body: {
      uname: 'user2',
      email: 'test-user1@georgegillams.co.uk',
    },
  };
  signUp(req).then(result => {
    expect(result.error).toBe(`Email already taken.`);

    expect(result.authorId).toBe(undefined);
    expect(result.email).toBe(undefined);
    expect(result.uname).toBe(undefined);
    expect(result.id).toBe(undefined);
    expect(result.lastUpdatedTimestamp).toBe(undefined);
    expect(result.session).toBe(undefined);
    expect(result.timestamp).toBe(undefined);
    done();
  });
});
