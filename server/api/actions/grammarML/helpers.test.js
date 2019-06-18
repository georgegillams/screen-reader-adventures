#!/usr/bin/env node

// eslint-disable-next-line
import jsregression from 'js-regression';
import winkPerceptron from 'wink-perceptron';

import { datumUpdate, datumLoad } from '../datum';

import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';
import {
  annotateSentences,
  extractDataMatrix,
  trainModel,
  useClassifier,
  splitData,
  THEIR_VALUE,
  THERE_VALUE,
} from './helpers';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

test('correctly annotates sentences', done => {
  const testData = [{ text: 'Put their stuff away.' }];

  const annotated = annotateSentences(testData);

  expect(annotated.length).toBe(1);
  expect(annotated[0].wordLength).toBe(4);
  expect(annotated[0].charLength).toBe(21);
  expect(annotated[0].endingCharacter).toBe(46);
  expect(annotated[0].label).toEqual(THEIR_VALUE);
  expect(annotated[0].charPositionOfTheire).toBe(4);
  expect(annotated[0].wordPositionOfTheire).toBe(1);

  done();
});

test('correctly annotates sentences with capitalisation', done => {
  const testData = [{ text: 'There she was.' }];

  const annotated = annotateSentences(testData);

  expect(annotated.length).toBe(1);
  expect(annotated[0].wordLength).toBe(3);
  expect(annotated[0].charLength).toBe(14);
  expect(annotated[0].endingCharacter).toBe(46);
  expect(annotated[0].label).toEqual(THERE_VALUE);
  expect(annotated[0].charPositionOfTheire).toBe(0);
  expect(annotated[0].wordPositionOfTheire).toBe(0);

  done();
});
