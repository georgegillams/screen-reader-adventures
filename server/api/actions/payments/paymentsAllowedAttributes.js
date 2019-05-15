import {
  INT_REGEX,
  SORT_CODE_REGEX,
  MONZO_ME_REGEX,
  STRING_REGEX,
} from 'helpers/constants';

const paymentsAllowedAttributes = [
  { attribute: 'amount', pattern: INT_REGEX },
  { attribute: 'sortCode', pattern: SORT_CODE_REGEX },
  { attribute: 'accountNumber', pattern: INT_REGEX },
  { attribute: 'monzoMeLink', pattern: MONZO_ME_REGEX },
  { attribute: 'reference', pattern: STRING_REGEX },
  { attribute: 'status', pattern: STRING_REGEX },
];

export default paymentsAllowedAttributes;
