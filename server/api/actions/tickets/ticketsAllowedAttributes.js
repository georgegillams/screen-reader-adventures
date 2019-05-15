import {
  UNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  STRING_REGEX,
  ID_REGEX,
} from 'helpers/constants';

const usersAllowedAttributes = [
  { attribute: 'ticketType', pattern: PASSWORD_REGEX },
];

export default usersAllowedAttributes;
