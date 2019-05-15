import {
  MD_PARTIAL_REGEX,
  ID_REGEX,
  NAME_REGEX,
  STRING_REGEX,
  DATE_REGEX,
  INT_REGEX,
  PASSWORD_REGEX,
  EMAIL_REGEX,
} from 'helpers/constants';

const registrationStatusAllowedAttributes = [
  { attribute: 'userId', pattern: ID_REGEX },
  { attribute: 'ticketId', pattern: ID_REGEX },
  { attribute: 'unregister', pattern: 'BOOL' },
  { attribute: 'email', pattern: EMAIL_REGEX },
];

export default registrationStatusAllowedAttributes;
