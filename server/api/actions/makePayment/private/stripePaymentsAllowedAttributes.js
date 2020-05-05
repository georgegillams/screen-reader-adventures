import {
  MD_PARTIAL_REGEX,
  ID_REGEX,
  NAME_REGEX,
  STRING_REGEX,
  DATE_REGEX,
  INT_REGEX,
  PASSWORD_REGEX,
} from 'helpers/constants';

const commentsAllowedAttributes = [
  { attribute: 'paymentToken', pattern: PASSWORD_REGEX },
  { attribute: 'paymentAmount', pattern: INT_REGEX },
  { attribute: 'paymentId', pattern: ID_REGEX },
  { attribute: 'resendId', pattern: ID_REGEX },
];

export default commentsAllowedAttributes;
