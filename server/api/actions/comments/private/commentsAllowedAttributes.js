import { MD_PARTIAL_REGEX, ID_REGEX, USERNAME_REGEX } from 'helpers/constants';

const commentsAllowedAttributes = [
  { attribute: 'pageId', pattern: ID_REGEX },
  { attribute: 'displayName', pattern: USERNAME_REGEX },
  { attribute: 'comment', pattern: MD_PARTIAL_REGEX },
];

export default commentsAllowedAttributes;
