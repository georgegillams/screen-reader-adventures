#!/usr/bin/env node

import HelperFunctions from '../HelperFunctions.js';

test('includes test string - returns false', () => {
  expect(HelperFunctions.includes('asdfghj', 'zxc')).toBe(false);
});

test('includes test string - returns true', () => {
  expect(HelperFunctions.includes('asdfghj', 'fgh')).toBe(true);
});

test('includes test array - returns false', () => {
  expect(HelperFunctions.includes(['a', 'b', 'c', 'd', 'e'], 'f')).toBe(false);
});

test('includes test array - returns true', () => {
  expect(HelperFunctions.includes(['a', 'b', 'c', 'd', 'e'], 'c')).toBe(true);
});
