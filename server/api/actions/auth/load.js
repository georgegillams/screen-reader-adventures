import authentication from 'utils/authentication';

export default function load(req) {
  return authentication(req).then(user => {
    if (user) {
      return {
        user: {
          id: user.id,
          name: user.name,
          uname: user.uname,
          email: user.email,
          emailVerified: user.emailVerified,
          admin: user.admin,
        },
      };
    }
    return { user: null };
  });
}
