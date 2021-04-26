#!/usr/bin/env node

import processAnalytics from './processAnalytics.js';

test('process analytics data properly ', done => {
  const data = [
    { ipAddressPrefix: '4.1.X.X', browser: 'browser1', browserVersion: '1', os: 'os1', url: '/url/1' },
    { ipAddressPrefix: '4.1.X.X', browser: 'browser1', browserVersion: '1', os: 'os2', url: '/url/2' },
    { ipAddressPrefix: '4.1.X.X', browser: 'browser1', browserVersion: '1', os: 'os1', url: '/url/1' },
    {
      ipAddressPrefix: '1.2.X.X',
      browser: 'browser2',
      browserVersion: '2',
      os: 'os2',
      url: '/url/4',
      utm_source: 'utmSource1',
      utm_medium: 'utmMedium1',
    },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser2', browserVersion: '2', os: 'os2', url: '/url/4' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser2', browserVersion: '2', os: 'os1', url: '/url/1' },
    { ipAddressPrefix: '1.0.X.X', browser: 'browser2', browserVersion: '2', os: 'os2', url: '/url/1' },
    {
      ipAddressPrefix: '1.0.X.X',
      browser: 'browser2',
      browserVersion: '2',
      os: 'os2',
      url: '/url/1',
      someUnknownProperty: '👽',
    },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser3', browserVersion: '3', os: 'os1', url: '/url/6' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser4', browserVersion: '4', os: 'os3', url: '/url/1' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser1', browserVersion: '1', os: 'os1', url: '/url/1' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser1', browserVersion: '1', os: 'os1', url: '/url/1' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser1', browserVersion: '1', os: 'os1', url: '/url/1' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser1', browserVersion: '1', os: 'os1', url: '/url/1' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser1', browserVersion: '1.3', os: 'os2', url: '/url/2' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser1', browserVersion: '1.3', os: 'os2', url: '/url/2' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser1', browserVersion: '1.3', os: 'os2', url: '/url/2' },
    { ipAddressPrefix: '1.2.X.X', browser: 'browser1', browserVersion: '1.3', os: 'os2', url: '/url/2' },
  ];

  const result = processAnalytics(data);
  expect(result).toMatchSnapshot();

  done();
});
