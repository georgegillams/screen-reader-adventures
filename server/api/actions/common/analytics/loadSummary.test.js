#!/usr/bin/env node

import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import loadSummary from './loadSummary.js';

import { dbCreate } from 'server-utils/common/database';
import { AuthError } from 'server-utils/common/errors';
import { clearDatabaseCollection, createUsersWithSessions } from 'server-utils/common/testUtils';

beforeEach(() => {
  clearDatabaseCollection('analytics');
});

const createSomeValues = () => {
  const analytic1 = {
    type: 'type1',
    url: 'url1',
    utm_source: 'urmSource1',
    utm_medium: 'urmMedium1',
    browser: 'browser1',
    browserVersion: 'version1',
    os: 'os1',
    disallowedAttribute: 'disallowed',
  };

  const analytic2 = {
    type: 'type2',
    url: 'url2',
    utm_source: 'urmSource2',
    utm_medium: 'urmMedium2',
    browser: 'browser2',
    browserVersion: 'version2',
    os: 'os2',
    disallowedAttribute: 'disallowed',
  };

  const analytic3 = {
    type: 'type1',
    url: 'url1',
    utm_source: 'urmSource1',
    utm_medium: 'urmMedium1',
    browser: 'browser1',
    browserVersion: 'version1',
    os: 'os1',
    disallowedAttribute: 'disallowed',
  };

  return dbCreate({ redisKey: 'analytics' }, { body: analytic1 })
    .then(() => dbCreate({ redisKey: 'analytics' }, { body: analytic2 }))
    .then(() => dbCreate({ redisKey: 'analytics' }, { body: analytic3 }));
};

test('load summary analytics admin - returns all values', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'adminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSummary(req))
    .then(results => {
      expect(results.analytics.length).toBe(2);
      expect(results.analytics[0].browser).toBe('browser1');
      expect(results.analytics[0].url).toBe('url1');
      return true;
    });
});

test('load summary analytics non-admin - throws auth error', () => {
  const req = {
    cookies: { [SESSION_COOKIE_KEY]: 'nonAdminSessionKey1' },
    headers: {},
    body: {},
  };

  return createUsersWithSessions()
    .then(() => createSomeValues())
    .then(() => loadSummary(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
    });
});

test('load summary analytics unauthenticated - throws auth error', () => {
  const req = {
    cookies: {},
    headers: {},
    body: {},
  };

  return createSomeValues()
    .then(() => loadSummary(req))
    .then(() => {
      // The action should have thrown an error
      throw new Error('Should have thrown an error already');
    })
    .catch(err => {
      expect(err instanceof AuthError).toBe(true);
    });
});
