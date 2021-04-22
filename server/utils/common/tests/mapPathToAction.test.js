#!/usr/bin/env node

import mapPathToActions from '../mapPathToAction.js';

const testAPIStructure = {
  action1: {
    method: 'get',
    path: '/action1/thing/random',
    action: 'DUMMY_ACTION_1',
  },
  action2: {
    method: 'get',
    path: '/action2/ping/pong',
    action: 'DUMMY_ACTION_2',
  },
  action3: {
    method: 'get',
    path: '/action3/with/:arg',
    action: 'DUMMY_ACTION_3',
  },
  action4: {
    method: 'get',
    path: '/action4/with/:multiple/args/:spread/about',
    action: 'DUMMY_ACTION_4',
  },
};

test('correctly gets path exactly matching URL', () => {
  const results = mapPathToActions(testAPIStructure, ['action1', 'thing', 'random']);

  expect(results.length).toEqual(1);
  expect(results[0].apiCapability.action).toEqual('DUMMY_ACTION_1');
  expect(results[0].params).toEqual({});
});

test('correctly gets path exactly matching URL with arg', () => {
  const results = mapPathToActions(testAPIStructure, ['action3', 'with', 'this-is-my-parameter']);

  expect(results.length).toEqual(1);
  expect(results[0].apiCapability.action).toEqual('DUMMY_ACTION_3');
  expect(results[0].params).toEqual({ arg: 'this-is-my-parameter' });
});

test('correctly gets path exactly matching URL with multiple args', () => {
  const results = mapPathToActions(testAPIStructure, [
    'action4',
    'with',
    'this-is-my-first-parameter',
    'args',
    'this-is-my-second-parameter',
    'about',
  ]);

  expect(results.length).toEqual(1);
  expect(results[0].apiCapability.action).toEqual('DUMMY_ACTION_4');
  expect(results[0].params).toEqual({
    multiple: 'this-is-my-first-parameter',
    spread: 'this-is-my-second-parameter',
  });
});
