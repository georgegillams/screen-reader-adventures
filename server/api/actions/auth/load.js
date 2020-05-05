import authentication from 'utils/authentication';

export default function loadAuth(req) {
  return new Promise(resolve => {
    authentication(req).then(user => {
      if (user) {
        user.emailFingerprint = null;
        user.hash = null;
      }
      resolve(user);
    });
  });
}
