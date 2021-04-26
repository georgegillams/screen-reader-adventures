import { dbLoad, dbUpdate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import { find } from 'server-utils/common/find';
import { AuthError } from 'server-utils/common/errors';

export default function verifyEmail(req) {
  return lockPromise('emailVerificationCodes', () => {
    const { verificationKey } = req.body;
    let emailVerification = null;
    return dbLoad({ redisKey: 'emailVerificationCodes' })
      .then(emailVerificationData => {
        // `find` uses `safeCompare` so it is safe to use for finding the entry that matches the key
        const { existingValue: emailVerificationMatch } = find(emailVerificationData, verificationKey, 'key');
        emailVerification = emailVerificationMatch;
        if (emailVerification) {
          if (Date.now() < new Date(emailVerification.expiry).getTime()) {
            // invalidate magic link (set expiry to 0)
            emailVerification.expiry = 0;
            return dbUpdate({ redisKey: 'emailVerificationCodes' }, { body: emailVerification });
          }
          throw new AuthError('Email verification link has expired');
        } else {
          throw new AuthError('Invalid verification link');
        }
      })
      .then(() => dbLoad({ redisKey: 'users' }))
      .then(userData => {
        const { existingValue: user } = find(userData, emailVerification.userId);
        if (user) {
          user.emailVerified = true;
          return dbUpdate({ redisKey: 'users' }, { body: user });
        }
        throw new AuthError('Invalid user');
      })
      .then(() => ({ success: 'Email verified' }));
  });
}
