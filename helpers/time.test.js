#!/usr/bin/env node

import { getTimeDifference } from './time.js';

test('getTimeDifference for large values - returns "5 years"', () => {
  const timeStamp = Number.MAX_SAFE_INTEGER;

  const result = getTimeDifference(timeStamp);

  expect(result).toBe('more than 5 years');
});

test('getTimeDifference for 5 minutes time - returns 5 minutes', () => {
  const timeStamp = Date.now() + 5 * 60 * 1000;

  const result = getTimeDifference(timeStamp);

  expect(result).toBe('in 5 minutes');
});

test('getTimeDifference for 5 minutes ago - returns 5 minutes ago', () => {
  const timeStamp = Date.now() - 5 * 60 * 1000;

  const result = getTimeDifference(timeStamp);

  expect(result).toBe('5 minutes ago');
});
