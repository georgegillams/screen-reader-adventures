import moment from 'moment';

const thisYear = moment().format('YYYY');
const lastYear = thisYear - 1;

const POT_CONFIGS = [
  {
    name: 'Season ticket',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Holiday',
    startDate: `${thisYear}-10-01`,
    startAmount: '215.49',
  },
  {
    name: 'Emergencies',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Gifts',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Charlie',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Extras',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Subscriptions (yearly) - Dropbox, Todoist and Domains',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Dentist and prescriptions',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Buffer',
  },
  {
    name: 'Eating out',
  },
  {
    name: 'Aerial (monthly)',
  },
  {
    name: 'Weekly',
  },
  {
    name: 'Leftover',
  },
];

export default POT_CONFIGS;
