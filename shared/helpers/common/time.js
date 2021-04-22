import formatDistance from 'date-fns/formatDistance';

const MS_PER_FIVE_YEARS = 5 * 365.25 * 24 * 60 * 60 * 1000;

const getTimeDifference = timeStamp => {
  if (timeStamp > 9000000000000000) {
    return '5 years';
  }
  const currentTime = new Date();
  return formatDistance(timeStamp, currentTime, { addSuffix: true });
};

const getTimeDifferenceFromMilliseconds = ms => {
  if (Math.abs(ms) > MS_PER_FIVE_YEARS) {
    if (ms < 0) {
      return 'a long time ago';
    }
    return 'a long time';
  }
  const currentTime = new Date().getTime();
  const futureTime = currentTime + ms;
  return formatDistance(futureTime, currentTime, { addSuffix: true });
};

export { getTimeDifference, getTimeDifferenceFromMilliseconds };
export default { getTimeDifference, getTimeDifferenceFromMilliseconds };
