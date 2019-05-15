import { datumLoad, datumUpdate } from '../actions/datum';
import { find } from 'utils/find';

export default function verifyemail(req) {
  return new Promise((resolve, reject) => {
    const { verificationKey } = req.body;
    datumLoad({ redisKey: 'emailVerificationCodes' }).then(
      emailVerificationData => {
        const { existingValue: emailVerification } = find(
          emailVerificationData,
          verificationKey,
          'key',
        );
        if (emailVerification) {
          if (Date.now() < new Date(emailVerification.expiry).getTime()) {
            // invalidate magic link (set expiry to 0)
            emailVerification.expiry = 0;
            datumUpdate(
              { redisKey: 'emailVerificationCodes' },
              { body: emailVerification },
            );
            datumLoad({ redisKey: 'users' }).then(userData => {
              const { existingValue: user } = find(
                userData,
                emailVerification.userId,
              );
              if (user) {
                user.emailVerified = true;
                resolve(datumUpdate({ redisKey: 'users' }, { body: user }));
              } else {
                resolve({ error: 'Invalid user' });
              }
            });
          } else {
            resolve({ error: 'Email verification link has expired' });
          }
        } else {
          resolve({ error: 'Invalid verification link' });
        }
      },
    );
  });
}
