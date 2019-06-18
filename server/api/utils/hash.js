import crypto from 'crypto';

import bcrypt from 'bcrypt';

export function compareHash(password, credentialHash) {
  const result = bcrypt.compareSync(password, credentialHash);
  return result;
}

export function hash(password) {
  const result = bcrypt.hashSync(password, 10);
  return result;
}

export function generateKey() {
  return crypto.randomBytes(20).toString('hex');
}
