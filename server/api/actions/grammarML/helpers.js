import { datumUpdate, datumLoad } from '../datum';
import jsregression from 'js-regression';
import winkPerceptron from 'wink-perceptron';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

const THEIR_VALUE = 'THEIR';
const THERE_VALUE = 'THERE';

const getLastTwoCharValues = word => {
  let result = 0;
  const wordLength = word.length;
  result += word.charCodeAt(wordLength - 1);
  result += word.charCodeAt(wordLength - 2);
  return result;
};

const annotateSentences = data => {
  return data.map(d => {
    const res = JSON.parse(JSON.stringify(d));
    if (!d || !d.text || d.text.length < 5) {
      return null;
    }
    const lowerCaseText = d.text.toLowerCase();
    res.wordLength = d.text.split(' ').length;
    res.charLength = d.text.length;
    res.endingCharacter = d.text.charCodeAt(res.charLength - 1);
    res.label = '';
    res.label += lowerCaseText.includes(`their`) ? THEIR_VALUE : '';
    res.label += lowerCaseText.includes(`there`) ? THERE_VALUE : '';

    let postTheireText = lowerCaseText;
    if (postTheireText.includes('there')) {
      postTheireText = postTheireText.split(`there`)[1];
    }
    if (postTheireText.includes('their')) {
      postTheireText = postTheireText.split('their')[1];
    }
    const preTheireText = lowerCaseText.split(`there`)[0].split('their')[0];
    res.charPositionOfTheire = preTheireText.length;
    res.wordPositionOfTheire = preTheireText.split(' ').length - 1;

    res.wordBeforeEnding = 0;
    res.wordAfterEnding = 0;

    const wordsBefore = preTheireText.split(' ');
    const wordBeforeIndex = wordsBefore.length - 2;
    if (wordBeforeIndex >= 0) {
      const wordBefore = wordsBefore[wordBeforeIndex];
      res.wordBeforeEnding = getLastTwoCharValues(wordBefore);
    }

    if (postTheireText) {
      const wordsAfter = postTheireText.split(' ');
      const wordAfterIndex = 1;
      if (wordAfterIndex > wordsAfter.length) {
        const wordAfter = wordsAfter[wordAfterIndex];
        res.wordAfterEnding = getLastTwoCharValues(wordAfter);
      }
    }

    return res;
  });
};

const extractDataMatrix = data => {
  const final = data.map(d => {
    if (!d) {
      return null;
    }
    const resX = JSON.parse(JSON.stringify(d));
    delete resX.text;
    delete resX.label;
    delete resX.id;
    delete resX.timestamp;
    delete resX.lastUpdatedTimestamp;
    delete resX.authorId;
    const resY = { label: d.label };
    return [resX, resY];
  });
  return final;
};

// const scanData = dataMatrix => {
//   const mins = {};
//   const maxs = {};
//   const averages = {};
//
//   dataMatrix.forEach(data => {
//     const dataX = data[0];
//     Object.keys(dataX).forEach(k => {
//       if (!mins[k]) {
//         mins[k] = 100000000;
//       }
//       if (!maxs[k]) {
//         maxs[k] = -100000000;
//       }
//       if (!averages[k]) {
//         averages[k] = 0;
//       }
//       console.log(`k`, k);
//       mins[k] = Math.min(dataX[k], mins[k]);
//       maxs[k] = Math.max(dataX[k], maxs[k]);
//       averages[k] += dataX[k] / dataMatrix.length;
//     });
//   });
//
//   return { mins, maxs, averages };
// };
//
// const getDataNormaliser = dataMatrix => {
//   const { mins, maxs, averages } = scanData(dataMatrix);
//   console.log(`mins`, mins);
//   console.log(`maxs`, maxs);
//   console.log(`averages`, averages);
//   // TODO - IMPLEMENT
//
//   return d => {
//     return d;
//   };
// };

const trainModel = data => {
  const perceptron = winkPerceptron();
  perceptron.defineConfig({ shuffleData: true, maxIterations: 21 });
  perceptron.learn(data);
  return perceptron;
};

const useClassifier = (classifier, testData) => {
  const prediction = classifier.predict(testData);
  return prediction;
};

const splitData = (arr, ratio) => {
  const trainingData = [];
  const testData = [];
  arr.forEach(a => {
    const randomNumber = Math.random();
    if (randomNumber < ratio) {
      trainingData.push(a);
    } else {
      testData.push(a);
    }
  });
  return { trainingData, testData };
};

export {
  useClassifier,
  trainModel,
  extractDataMatrix,
  annotateSentences,
  THERE_VALUE,
  THEIR_VALUE,
  splitData,
};
