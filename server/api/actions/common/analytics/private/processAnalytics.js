const groupingProperties = ['browser', 'os', 'url', 'utm_source', 'utm_medium', 'ipAddressPrefix', 'browserVersion'];

/**
 * Creates a key for a data point
 * @param {object} dataPoint The data point to consider
 * @returns {string} The key for the data point
 */

const keyForData = dataPoint => {
  const values = [];
  groupingProperties.forEach(gp => {
    values.push(dataPoint[gp]);
  });
  return values.join('_');
};

/**
 * Inserts the new data point into the list, or if it exists increments the count for the matching entry
 * @param {array} list The list to update
 * @param {object} dataPoint The data point to consider
 * @returns {null} none
 */

const insertOrUpdateCount = (list, dataPoint) => {
  const dataPointKey = keyForData(dataPoint);
  const matchingEntries = list.filter(l => l.key === dataPointKey);
  if (matchingEntries.length > 0) {
    matchingEntries[0].count += 1;
  } else {
    const newValue = { key: dataPointKey, count: 1 };
    groupingProperties.forEach(gp => {
      newValue[gp] = dataPoint[gp];
    });
    list.push(newValue);
  }
};

/**
 * Processes analytic data to group analytics by characteristics and count instances of each
 * @param {array} data The data point to consider
 * @returns {array} The unique analytics with counts of how many times they occur
 */

const processAnalytics = data => {
  const uniqueDataPoints = [];
  data.forEach(d => {
    insertOrUpdateCount(uniqueDataPoints, d);
  });
  return uniqueDataPoints;
};

export default processAnalytics;
