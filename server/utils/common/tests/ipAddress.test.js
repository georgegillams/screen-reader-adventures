#!/usr/bin/env node

import { ipPrefix } from '../ipAddress.js';

test('correctly gets ipv4 prefix', () => {
  const result = ipPrefix('192.168.0.123');

  expect(result).toEqual('192.168.X.X');
});

test('correctly gets ipv6 prefix', () => {
  const result = ipPrefix('1:2:3:4:5:6:7:ffff');

  expect(result).toEqual('1:2:3:4:X:X:X:X');
});

test('fails gracefully with length-0 input', () => {
  const result = ipPrefix('');

  expect(result).toEqual('');
});

test('fails gracefully with length-1 input', () => {
  const result = ipPrefix('1');

  expect(result).toEqual('');
});
