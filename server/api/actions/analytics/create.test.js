#!/usr/bin/env node

import create from './create.js';

import { dbLoad } from 'utils/database';
import { clearDatabaseCollection } from 'utils/testUtils';

beforeEach(() => {
  clearDatabaseCollection('analytics');
});

test('create analytics unauthenticated - adds data to collection', () => {
  const req = {
    cookies: {},
    headers: {},
    connection: { remoteAddress: 'remoteAddress1' },
    body: {
      type: 'type1',
      url: 'url1',
      utm_source: 'urmSource1',
      utm_medium: 'urmMedium1',
      browser: 'browser1',
      browserVersion: 'version1',
      os: 'os1',
      disallowedAttribute: 'disallowed',
    },
  };

  return create(req)
    .then(() => dbLoad({ redisKey: 'analytics', includeOwnerUname: true }))
    .then(results => {
      expect(results.length).toBe(1);
      expect(results[0].ipAddress).toBe('remoteAddress1');
      expect(results[0].browser).toBe('browser1');
      expect(results[0].url).toBe('url1');
      expect(results[0].authorId).toBe(undefined);
      expect(results[0].disallowedAttribute).toBe(undefined);
      return true;
    });
});

test('create analytics unauthenticated with forwarded header - uses correct IP address', () => {
  const req = {
    cookies: {},
    headers: {
      'x-forwarded-for': 'remoteAddress2',
    },
    connection: { remoteAddress: 'remoteAddress0' },
    body: {
      type: 'type2',
      url: 'url2',
      utm_source: 'urmSource2',
      utm_medium: 'urmMedium2',
      browser: 'browser2',
      browserVersion: 'version2',
      os: 'os2',
      disallowedAttribute: 'disallowed',
    },
  };

  return create(req)
    .then(() => dbLoad({ redisKey: 'analytics', includeOwnerUname: true }))
    .then(results => {
      expect(results.length).toBe(1);
      expect(results[0].ipAddress).toBe('remoteAddress2');
      expect(results[0].browser).toBe('browser2');
      expect(results[0].url).toBe('url2');
      expect(results[0].authorId).toBe(undefined);
      expect(results[0].disallowedAttribute).toBe(undefined);
      return true;
    });
});

test('create analytics authenticated - adds data to collection', () => {
  const req = {
    cookies: {},
    headers: {
      apikey: 'secret_api_key',
    },
    connection: { remoteAddress: 'remoteAddress3' },
    body: {
      type: 'type3',
      url: 'url3',
      utm_source: 'urmSource3',
      utm_medium: 'urmMedium3',
      browser: 'browser3',
      browserVersion: 'version3',
      os: 'os3',
      disallowedAttribute: 'disallowed',
    },
  };

  return create(req)
    .then(() => dbLoad({ redisKey: 'analytics', includeOwnerUname: true }))
    .then(results => {
      expect(results.length).toBe(1);
      expect(results[0].browser).toBe('browser3');
      expect(results[0].url).toBe('url3');
      expect(results[0].authorId).toBe('direct_API_invocator');
      expect(results[0].disallowedAttribute).toBe(undefined);
      return true;
    });
});
