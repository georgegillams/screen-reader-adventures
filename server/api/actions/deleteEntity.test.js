#!/usr/bin/env node

import deleteEntity from './deleteEntity.js';
import { datumLoadSingle, datumCreate, datumUpdate } from './datum';

test('returns error if not admin', done => {
  datumCreate(
    { redisKey: 'users' },
    { body: { requestedId: 'user5', name: 'George' } },
  ).then(() => {
    const req = {
      cookies: {},
      headers: {},
      body: {
        collectionName: 'users',
        id: 'user5',
      },
    };
    deleteEntity(req).then(result => {
      expect(result.error).toBe('authentication');

      datumLoadSingle({
        redisKey: 'users',
        filter: u => u.id === 'user5',
      }).then(dbResult => {
        expect(dbResult).toBeTruthy();
        expect(dbResult.name).toBe('George');
        done();
      });
    });
  });
});

test('returns error if item is not already marked for deletion', done => {
  datumCreate(
    { redisKey: 'emails' },
    {
      body: { requestedId: 'email2', to: 'address@example.com', message: 'Hi' },
    },
  ).then(() => {
    const req = {
      cookies: {},
      headers: { apikey: 'asdfghjkl' },
      body: {
        collectionName: 'users',
        id: 'user5',
      },
    };
    deleteEntity(req).then(result => {
      expect(result.error).toBe(
        'Only deleted entities can be permanently removed.',
      );

      datumLoadSingle({
        redisKey: 'users',
        filter: u => u.id === 'user5',
      }).then(userDbResult => {
        expect(userDbResult).toBeTruthy();
        expect(userDbResult.name).toBe('George');
        datumLoadSingle({
          redisKey: 'emails',
          resolveIfNotFound: true,
          filter: u => u.id === 'email2',
        }).then(emailDbResult => {
          expect(emailDbResult).toBeTruthy();
          expect(emailDbResult.message).toBe('Hi');
          done();
        });
      });
    });
  });
});

test('allows permanent deletion of deletedItem if admin', done => {
  datumCreate(
    { redisKey: 'users' },
    {
      body: { requestedId: 'user6', name: 'Geoff', deleted: true },
    },
  ).then(() => {
    const req = {
      cookies: {},
      headers: { apikey: 'asdfghjkl' },
      body: {
        collectionName: 'users',
        id: 'user6',
      },
    };
    deleteEntity(req).then(result => {
      console.log(`result`, result);
      expect(result).toBe(undefined);

      datumLoadSingle({
        redisKey: 'users',
        resolveIfNotFound: true,
        filter: u => u.id === 'user6',
      }).then(user6DbResult => {
        expect(user6DbResult).toBe(undefined);
        datumLoadSingle({
          redisKey: 'emails',
          resolveIfNotFound: true,
          filter: e => e.id === 'email2',
        }).then(emailDbResult => {
          expect(emailDbResult).toBeTruthy();
          expect(emailDbResult.message).toBe('Hi');
          datumLoadSingle({
            redisKey: 'users',
            filter: u => u.id === 'user5',
          }).then(user5DbResult => {
            expect(user5DbResult).toBeTruthy();
            expect(user5DbResult.name).toBe('George');
            done();
          });
        });
      });
    });
  });
});
