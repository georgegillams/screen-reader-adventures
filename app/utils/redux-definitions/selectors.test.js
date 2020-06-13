#!/usr/bin/env node

// eslint-disable-next-line
import createSelectors, { mapSelectors } from './selectors.js';

test('correctly creates selectors from state entities', done => {
  const testEntities = ['propertyUno', 'propertyDos'];
  const selectors = createSelectors('statePrefix', testEntities);
  const selectorFunctionNames = Object.keys(selectors);

  expect(selectorFunctionNames.length).toBe(2);
  expect(selectorFunctionNames[0]).toEqual('makeSelectPropertyUno');
  expect(selectorFunctionNames[1]).toEqual('makeSelectPropertyDos');

  expect(typeof selectors[selectorFunctionNames[0]]).toEqual('function');
  expect(typeof selectors[selectorFunctionNames[1]]).toEqual('function');

  done();
});

test('correctly maps selectors', done => {
  const testEntities = ['propertyUno', 'propertyDos'];
  const selectors = createSelectors('statePrefix', testEntities);

  const mappedSelectors = mapSelectors(selectors);
  const mappedSelectorNames = Object.keys(mappedSelectors);

  expect(mappedSelectorNames.length).toBe(2);
  expect(mappedSelectorNames[0]).toEqual('propertyUno');
  expect(mappedSelectorNames[1]).toEqual('propertyDos');

  done();
});
