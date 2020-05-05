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
  { attribute: 'name', pattern: NAME_REGEX },
  { attribute: 'surname', pattern: NAME_REGEX },
  { attribute: 'returningDelegate', pattern: 'BOOL' },
  { attribute: 'university', pattern: NAME_REGEX },
  { attribute: 'degreeCourse', pattern: STRING_REGEX },
  { attribute: 'yearOfStudy', pattern: INT_REGEX },
  { attribute: 'dietaryRequirements', pattern: STRING_REGEX },
  { attribute: 'alergies', pattern: STRING_REGEX },
  { attribute: 'otherRequirements', pattern: STRING_REGEX },
  { attribute: 'photoReleaseConsented', pattern: 'BOOL' },
  { attribute: 'photoReleaseConsented', pattern: 'BOOL' },
  { attribute: 'paymentToken', pattern: PASSWORD_REGEX },
  { attribute: 'paymentAmount', pattern: INT_REGEX },
];

export default commentsAllowedAttributes;
