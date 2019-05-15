import {
  MD_COMPLETE_REGEX,
  ANYTHING_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';

const grammarMLAllowedAttributes = [
  { attribute: 'text', pattern: ANYTHING_REGEX },
  { attribute: 'ratio', pattern: DECIMAL_REGEX },
];

export default grammarMLAllowedAttributes;
