#!/usr/bin/env node

// eslint-disable-next-line
import defineConstants, {
  inferConstantsFromActionDefinitions,
} from './constants';

const testActionDefinitions = [
  { MY_ACTION_NAME: 'tbd', attributes: [] },
  {
    MY_ACTION_NAME_SUCCESS: 'tbd',
    attributes: ['theFirstArgument', 'theSecondArgument'],
  },
  { MY_ACTION_NAME_ERROR: 'tbd', attributes: ['theFirstErrorArgument'] },
];

test('correctly creates constants from strings', done => {
  const constants = defineConstants(
    'MY_ACTION_NAME',
    'MY_ACTION_NAME_SUCCESS',
    'MY_ACTION_NAME_ERROR',
  );

  const constantNames = Object.keys(constants);
  expect(constantNames.length).toBe(3);

  expect(constantNames[0]).toBe('MY_ACTION_NAME');
  expect(constantNames[1]).toBe('MY_ACTION_NAME_SUCCESS');
  expect(constantNames[2]).toBe('MY_ACTION_NAME_ERROR');

  expect(constants[constantNames[0]].includes('MY_ACTION_NAME-')).toBe(true);
  expect(constants[constantNames[1]].includes('MY_ACTION_NAME_SUCCESS-')).toBe(
    true,
  );
  expect(constants[constantNames[2]].includes('MY_ACTION_NAME_ERROR-')).toBe(
    true,
  );

  done();
});

test('correctly creates constant names from actionDefinitions', done => {
  const constants = inferConstantsFromActionDefinitions(testActionDefinitions);

  expect(constants.length).toBe(3);

  expect(constants[0]).toBe('MY_ACTION_NAME');
  expect(constants[1]).toBe('MY_ACTION_NAME_SUCCESS');
  expect(constants[2]).toBe('MY_ACTION_NAME_ERROR');

  done();
});
