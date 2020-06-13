import moment from 'moment';

const getTimeDifference = timeStamp => {
  if (timeStamp > 9000000000000000) {
    return 'more than 5 years';
  }
  return moment(timeStamp).fromNow();
};

export { getTimeDifference };
export default {
  getTimeDifference,
};
