import moment from 'moment';

const getTimeDifference = timeStamp => {
  if (timeStamp > 9000000000000000) {
    return '5 years';
  }
  const currentTime = moment();
  return moment(timeStamp).fromNow();
};

export { getTimeDifference };
export default {
  getTimeDifference,
};
