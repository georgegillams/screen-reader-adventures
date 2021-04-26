import { AuthError, NotFoundError } from './errors';

const EMAIL_TAKEN = {
  error: 'invalid-request',
  errorMessage: 'Email already taken.',
};
const INVALID_SESSION = new AuthError('Invalid session. Try clearing cookies for this site and then re-authenticate');
const INVALID_CREDENTIALS = {
  error: 'wrong-input',
  errorMessage: 'Error logging in. The credentials supplied are invalid.',
};
const UNAUTHORISED_READ = new AuthError('You are not authorised to read this resource');
const UNAUTHORISED_WRITE = new AuthError('You are not authorised to write to this resource');
const RESOURCE_NOT_FOUND = new NotFoundError(
  "We looked everywhere but we couldn't find that resource. Maybe you need to sign in."
);

export { EMAIL_TAKEN, INVALID_CREDENTIALS, INVALID_SESSION, RESOURCE_NOT_FOUND, UNAUTHORISED_READ, UNAUTHORISED_WRITE };
export default {
  EMAIL_TAKEN,
  INVALID_CREDENTIALS,
  INVALID_SESSION,
  RESOURCE_NOT_FOUND,
  UNAUTHORISED_READ,
  UNAUTHORISED_WRITE,
};
