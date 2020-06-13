#!/usr/bin/env node

import processAnalytics from './processAnalytics.js';

test('process analytics data properly ', done => {
  const data = [
    { browser: 'browser1', os: 'os1', url: '/url/1' },
    { browser: 'browser1', os: 'os2', url: '/url/2' },
    { browser: 'browser1', os: 'os1', url: '/url/1' },
    {
      browser: 'browser2',
      os: 'os2',
      url: '/url/4',
      utm_source: 'utmSource1',
      utm_medium: 'utmMedium1',
    },
    { browser: 'browser2', os: 'os2', url: '/url/4' },
    { browser: 'browser2', os: 'os1', url: '/url/1' },
    { browser: 'browser2', os: 'os2', url: '/url/1' },
    {
      browser: 'browser2',
      os: 'os2',
      url: '/url/1',
      someUnknownProperty: '👽',
    },
    { browser: 'browser3', os: 'os1', url: '/url/6' },
    { browser: 'browser4', os: 'os3', url: '/url/1' },
    { browser: 'browser1', os: 'os1', url: '/url/1' },
    { browser: 'browser1', os: 'os1', url: '/url/1' },
    { browser: 'browser1', os: 'os1', url: '/url/1' },
    { browser: 'browser1', os: 'os1', url: '/url/1' },
    { browser: 'browser1', os: 'os2', url: '/url/2' },
    { browser: 'browser1', os: 'os2', url: '/url/2' },
    { browser: 'browser1', os: 'os2', url: '/url/2' },
    { browser: 'browser1', os: 'os2', url: '/url/2' },
  ];
  const result = processAnalytics(data);
  expect(result.length).toBe(8);
  expect(result[0].key).toBe('browser1_os1_/url/1__');
  expect(result[1].key).toBe('browser1_os2_/url/2__');
  expect(result[2].key).toBe('browser2_os2_/url/4_utmSource1_utmMedium1');
  expect(result[3].key).toBe('browser2_os2_/url/4__');
  expect(result[4].key).toBe('browser2_os1_/url/1__');
  expect(result[5].key).toBe('browser2_os2_/url/1__');
  expect(result[6].key).toBe('browser3_os1_/url/6__');
  expect(result[7].key).toBe('browser4_os3_/url/1__');

  expect(result[0].count).toBe(6);
  expect(result[1].count).toBe(5);
  expect(result[2].count).toBe(1);
  expect(result[3].count).toBe(1);
  expect(result[4].count).toBe(1);
  expect(result[5].count).toBe(2);
  expect(result[6].count).toBe(1);
  expect(result[7].count).toBe(1);

  expect(result[2].utm_source).toBe('utmSource1');
  expect(result[2].utm_medium).toBe('utmMedium1');
  expect(result[7].browser).toBe('browser4');
  expect(result[7].os).toBe('os3');
  expect(result[7].url).toBe('/url/1');
  expect(result[7].utm_source).toBe(undefined);
  expect(result[7].utm_medium).toBe(undefined);

  done();
});
