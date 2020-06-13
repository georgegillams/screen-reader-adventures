#!/usr/bin/env node

import {
  formValueChanged,
  normaliseArray,
  denormaliseObject,
} from './objects.js';

// #region formValueChanged
test('formValueChanged with value - adds attribute', () => {
  let formEntity = {
    name: 'testName',
    selected: false,
  };

  formValueChanged(
    formEntity,
    'newAttribute',
    {
      target: {
        value: 'newValue',
      },
    },
    newValue => {
      formEntity = newValue;
    },
  );

  expect(formEntity.name).toBe('testName');
  expect(formEntity.selected).toBe(false);
  expect(formEntity.newAttribute).toBe('newValue');
});

test('formValueChanged with boolean - adds attribute', () => {
  let formEntity = {
    name: 'testName',
    selected: false,
  };

  formValueChanged(
    formEntity,
    'newAttribute',
    {
      target: {
        value: 'on',
        checked: true,
      },
    },
    newValue => {
      formEntity = newValue;
    },
  );

  expect(formEntity.name).toBe('testName');
  expect(formEntity.selected).toBe(false);
  expect(formEntity.newAttribute).toBe(true);
});

test('formValueChanged with value - updates attribute', () => {
  let formEntity = { name: 'testName', selected: false };

  formValueChanged(
    formEntity,
    'name',
    {
      target: {
        value: 'newValue',
      },
    },
    newValue => {
      formEntity = newValue;
    },
  );

  expect(formEntity.name).toBe('newValue');
  expect(formEntity.selected).toBe(false);
  expect(formEntity.newAttribute).toBe(undefined);
});

test('formValueChanged with boolean - updates attribute', () => {
  let formEntity = {
    name: 'testName',
    selected: false,
  };

  formValueChanged(
    formEntity,
    'selected',
    {
      target: {
        value: 'on',
        checked: true,
      },
    },
    newValue => {
      formEntity = newValue;
    },
  );

  expect(formEntity.name).toBe('testName');
  expect(formEntity.selected).toBe(true);
  expect(formEntity.newAttribute).toBe(undefined);
});
// #endregion formValueChanged

// #region normalisation
test('normaliseArray - returns correct result', () => {
  const input = [
    { name: 'name1', description: 'desc1' },
    { id: 'testId2', name: 'name2', description: 'desc2' },
    { id: 'testId3', name: 'name3', description: 'desc3' },
    { id: 'testId4', name: 'name4', description: 'desc4' },
  ];

  const result = normaliseArray(input);

  expect(Object.keys(result)).toStrictEqual([
    '0',
    'testId2',
    'testId3',
    'testId4',
  ]);
  expect(result['0'].name).toBe('name1');
  expect(result.testId2.id).toBe('testId2');
  expect(result.testId2.name).toBe('name2');
  expect(result.testId3.id).toBe('testId3');
  expect(result.testId3.name).toBe('name3');
  expect(result.testId4.id).toBe('testId4');
  expect(result.testId4.name).toBe('name4');
});

test('denormaliseObject - returns correct result', () => {
  const input = {
    '1': { name: 'name1', description: 'desc1' },
    testId2: { id: 'testId2', name: 'name2', description: 'desc2' },
    testId3: { id: 'testId3', name: 'name3', description: 'desc3' },
    testId4: { id: 'testId4', name: 'name4', description: 'desc4' },
  };

  const result = denormaliseObject(input);

  expect(result.length).toBe(4);
  expect(result[0].name).toBe('name1');
  expect(result[1].name).toBe('name2');
  expect(result[2].name).toBe('name3');
  expect(result[3].name).toBe('name4');
});
// #endregion normalisation
