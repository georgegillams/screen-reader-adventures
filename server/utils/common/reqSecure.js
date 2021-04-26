import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';
import { INT_REGEX, ID_REGEX, PASSWORD_REGEX, ANYTHING_REGEX } from 'helpers/regexConstants';

const standardAttributes = [
  { attribute: 'deleted', pattern: 'BOOL' },
  { attribute: 'id', pattern: ID_REGEX },
  { attribute: 'requestedId', pattern: ID_REGEX },
  { attribute: 'apikey', pattern: PASSWORD_REGEX },
  { attribute: 'timestamp', pattern: INT_REGEX },
  { attribute: SESSION_COOKIE_KEY, pattern: ID_REGEX },
  { attribute: 'x-forwarded-for', pattern: ANYTHING_REGEX },
];

function generateNewComponent(component, req, allAllowedAttributes) {
  if (!req[component]) {
    return undefined;
  }
  const newComponent = {};
  for (let i = 0; i < allAllowedAttributes.length; i += 1) {
    const name = allAllowedAttributes[i].attribute;
    const { pattern } = allAllowedAttributes[i];
    if (req[component][name]) {
      if (pattern === 'BOOL') {
        newComponent[name] = !!req[component][name];
      } else if (pattern && req[component][name].toString().match(pattern)) {
        // pattern is a regex:
        newComponent[name] = req[component][name];
      }
    }
  }
  return newComponent;
}

export default function reqSecure(req, allowedAttributes) {
  const allAllowedAttributes = [...allowedAttributes, ...standardAttributes];

  req.body = generateNewComponent('body', req, allAllowedAttributes);
  req.query = generateNewComponent('query', req, allAllowedAttributes);
  req.headers = generateNewComponent('headers', req, allAllowedAttributes);
  req.cookies = generateNewComponent('cookies', req, allAllowedAttributes);
  return req;
}
