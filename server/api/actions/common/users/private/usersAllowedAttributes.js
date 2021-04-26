import { USERNAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX, STRING_REGEX } from 'helpers/regexConstants';

const usersAllowedAttributes = [
  { attribute: 'name', pattern: STRING_REGEX },
  { attribute: 'uname', pattern: USERNAME_REGEX },
  { attribute: 'email', pattern: EMAIL_REGEX },
  { attribute: 'admin', pattern: 'BOOL' },
  { attribute: 'password', pattern: PASSWORD_REGEX },
];

export default usersAllowedAttributes;
