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
} from './helpers';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function test(req) {
  const reqSecured = reqSecure(req, grammarMLAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        const { ratio } = reqSecured.body;
        datumLoad({
          redisKey: 'grammarML',
        }).then(allData => {
          const { trainingData, testData } = splitData(
            allData,
            parseFloat(ratio),
          );
          const annotatedData = annotateSentences(trainingData);
          const annotatedTestData = annotateSentences(testData);
          const dataMatrix = extractDataMatrix(annotatedData);
          const testDataMatrix = extractDataMatrix(annotatedTestData);
          // const normaliser = getDataNormaliser(dataMatrix);
          // dataMatrix = dataMatrix.map(normaliser);
          // testDataMatrix = dataMatrix.map(normaliser);

          // console.log(`dataMatrix`, dataMatrix);
          // console.log(`testDataMatrix`, testDataMatrix);

          let predictionsMade = 0;
          let correctPredictions = 0;

          const classifier = trainModel(dataMatrix);
          testDataMatrix.forEach(td => {
            const testItem = td[0];
            // console.log(`testItem`, testItem);
            const result = useClassifier(classifier, testItem);
            // console.log(`label`, td[1].label);
            predictionsMade += 1;
            if (result === td[1].label) {
              correctPredictions += 1;
            }
          });
          // console.log(`correctResult`, correctResult);
          resolve({ result: correctPredictions / predictionsMade });
        });
      },
      err => reject(err),
    );
  });
}
