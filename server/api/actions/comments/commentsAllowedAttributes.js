import { MD_PARTIAL_REGEX, ID_REGEX, UNAME_REGEX } from 'helpers/constants';

const commentsAllowedAttributes = [
  { attribute: 'pageId', pattern: ID_REGEX },
  { attribute: 'displayName', pattern: UNAME_REGEX },
  { attribute: 'comment', pattern: MD_PARTIAL_REGEX },
];

export default commentsAllowedAttributes;
