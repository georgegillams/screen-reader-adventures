import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  STRING_REGEX,
  ID_REGEX,
  REDIRECT_REGEX,
} from 'helpers/regexConstants';

const usersAllowedAttributes = [
  { attribute: 'name', pattern: STRING_REGEX },
  { attribute: 'magicLinkKey', pattern: ID_REGEX },
  { attribute: 'uname', pattern: USERNAME_REGEX },
  { attribute: 'email', pattern: EMAIL_REGEX },
  { attribute: 'admin', pattern: 'BOOL' },
  { attribute: 'divertToAdmin', pattern: 'BOOL' },
  { attribute: 'password', pattern: PASSWORD_REGEX },
  { attribute: 'ticketType', pattern: PASSWORD_REGEX },
  { attribute: 'loginRedirect', pattern: REDIRECT_REGEX },
];

export default usersAllowedAttributes;
