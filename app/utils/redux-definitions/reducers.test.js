#!/usr/bin/env node

// eslint-disable-next-line
import { fromJS } from 'immutable';
import {
  inferPropertiesFromInitialState,
  getInitialState,
} from './reducers.js';

const testInitialState = fromJS({
  loading: false,
  error: null,
  blogId: null,
  success: false,
  blog: null,
  updating: false,
  updateError: null,
  newBlog: null,
  updateSuccess: false,
  creating: false,
  createError: null,
  createSuccess: false,
});

const testReducer = (state = testInitialState, action) => {
  switch (action.type) {
    case 'CONSTANT_1':
      return state
        .set('loading', true)
        .set('error', false)
        .set('blogId', action.blogId);
    case 'CONSTANT_2':
      return state
        .set('loading', false)
        .set('success', true)
        .set('blog', action.blog);
    default:
      return state;
  }
};

test('correctly gets intial state from reducer', done => {
  const inferedInitialState = getInitialState(testReducer);

  expect(inferedInitialState).toEqual(testInitialState);

  done();
});

test('correctly infers properties from initial state', done => {
  const inferedProperties = inferPropertiesFromInitialState(
    getInitialState(testReducer),
  );

  expect(inferedProperties).toEqual([
    'newBlog',
    'blog',
    'success',
    'updating',
    'createSuccess',
    'error',
    'createError',
    'creating',
    'updateSuccess',
    'loading',
    'blogId',
    'updateError',
  ]);

  done();
});
