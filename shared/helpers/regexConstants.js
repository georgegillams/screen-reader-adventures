const DECIMAL_REGEX = /^[0-9\\.]*$/gi;
const INT_REGEX = /^[0-9]*$/gi;
const SORT_CODE_REGEX = /^[0-9\\.-]*$/gi;
const STRING_REGEX = /^[A-Za-z0-9\\.\\ ]*$/gi;
const ID_REGEX = /^[A-Za-z0-9\\-]*$/gi;
const USERNAME_REGEX = /^[A-Za-z0-9\\.\\ ]*$/gi;
const REDIRECT_REGEX = /^[A-Za-z0-9\\.\\ \-\\_#\\/]*$/gi;
const NAME_REGEX = /^[A-Za-z\\ ]*$/gi;
const MONZOME_LINK_REGEX = /^(https?:\/\/)?monzo\.me\/[A-Za-z_-]+(\/.*)?$/gi;
const NON_EMOJI_REGEX = /[A-Za-zä\\ 0-9,]*/gi;
// eslint-disable-next-line max-len
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\\.\\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi;
const PASSWORD_REGEX = /.{6,}/gi;
const MD_COMPLETE_REGEX = /.*/gi; // TODO UPDATE
const MD_PARTIAL_REGEX = /.*/gi; // TODO UPDATE
const CARD_NUMBER_REGEX = /.*/gi; // TODO UPDATE
const CVV_REGEX = /.*/gi; // TODO UPDATE
const EXPIRY_REGEX = /.*/gi; // TODO UPDATE
const DATE_REGEX = /.*/gi; // TODO UPDATE
const ANYTHING_REGEX = /.*/gi;

export {
  ANYTHING_REGEX,
  CARD_NUMBER_REGEX,
  CVV_REGEX,
  DATE_REGEX,
  DECIMAL_REGEX,
  EMAIL_REGEX,
  EXPIRY_REGEX,
  ID_REGEX,
  INT_REGEX,
  MD_COMPLETE_REGEX,
  MD_PARTIAL_REGEX,
  MONZOME_LINK_REGEX,
  NAME_REGEX,
  NON_EMOJI_REGEX,
  PASSWORD_REGEX,
  REDIRECT_REGEX,
  SORT_CODE_REGEX,
  STRING_REGEX,
  USERNAME_REGEX,
};
export default {
  ANYTHING_REGEX,
  CARD_NUMBER_REGEX,
  CVV_REGEX,
  DATE_REGEX,
  DECIMAL_REGEX,
  EMAIL_REGEX,
  EXPIRY_REGEX,
  ID_REGEX,
  INT_REGEX,
  MD_COMPLETE_REGEX,
  MD_PARTIAL_REGEX,
  MONZOME_LINK_REGEX,
  NAME_REGEX,
  NON_EMOJI_REGEX,
  PASSWORD_REGEX,
  REDIRECT_REGEX,
  SORT_CODE_REGEX,
  STRING_REGEX,
  USERNAME_REGEX,
};
