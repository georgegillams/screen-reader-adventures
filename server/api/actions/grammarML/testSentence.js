import jsregression from 'js-regression';
import winkPerceptron from 'wink-perceptron';

import { datumUpdate, datumLoad } from '../datum';

import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';
import {
  annotateSentences,
  extractDataMatrix,
  trainModel,
  useClassifier,
  THERE_VALUE,
  THEIR_VALUE,
} from './helpers';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function test(req) {
  const reqSecured = reqSecure(req, grammarMLAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        const { text } = reqSecured.body;
        datumLoad({
          redisKey: 'grammarML',
        }).then(trainingData => {
          const testData = [reqSecured.body];
          const annotatedData = annotateSentences(trainingData);
          const annotatedTestData = annotateSentences(testData);
          const dataMatrix = extractDataMatrix(annotatedData);
          let testDataMatrix = extractDataMatrix(annotatedTestData);
          // const normaliser = getDataNormaliser(dataMatrix);
          // dataMatrix = dataMatrix.map(normaliser);
          // testDataMatrix = dataMatrix.map(normaliser);
          testDataMatrix = testDataMatrix[0][0];

          // console.log(`dataMatrix`, dataMatrix);
          // console.log(`testDataMatrix`, testDataMatrix);
          const classifier = trainModel(dataMatrix);
          const result = useClassifier(classifier, testDataMatrix);
          let correctResult = "Sentence does not contain 'there' or 'their'";
          if (
            text.toLowerCase().includes('there') ||
            text.toLowerCase().includes('their')
          ) {
            correctResult = 'Sentence is correct';
          }
          if (result === THERE_VALUE && text.toLowerCase().includes('their')) {
            correctResult = 'Sentence is incorrect. Should read: ';
            correctResult += text
              .toLowerCase()
              .split(`their`)
              .join('there');
          }
          if (result === THEIR_VALUE && text.toLowerCase().includes('there')) {
            correctResult = 'Sentence is incorrect. Should read: ';
            correctResult += text
              .toLowerCase()
              .split(`there`)
              .join('their');
          }
          // console.log(`correctResult`, correctResult);
          resolve({ result: correctResult });
        });
      },
      err => reject(err),
    );
  });
}
