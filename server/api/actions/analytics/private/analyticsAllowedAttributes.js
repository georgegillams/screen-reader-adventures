import { STRING_REGEX, ANYTHING_REGEX } from 'helpers/regexConstants';

const analyticsAllowedAttributes = [
  { attribute: 'type', pattern: STRING_REGEX },
  { attribute: 'url', pattern: ANYTHING_REGEX },
  { attribute: 'utm_source', pattern: STRING_REGEX },
  { attribute: 'utm_medium', pattern: STRING_REGEX },
  { attribute: 'browser', pattern: STRING_REGEX },
  { attribute: 'browserVersion', pattern: STRING_REGEX },
  { attribute: 'os', pattern: STRING_REGEX },
];

export default analyticsAllowedAttributes;
