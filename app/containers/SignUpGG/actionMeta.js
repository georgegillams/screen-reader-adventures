const actionMeta = {
  key: 'magicLogin',
  actionDefinitions: [
    {
      SET_CREDENTIALS: 'tbd',
      attributes: ['credentials'],
      stateMutations: {
        credentials: action => action.credentials,
      },
    },
    {
      SIGN_UP: 'tbd',
      attributes: [],
      stateMutations: {
        signingUp: true,
        signUpError: null,
      },
    },
    {
      SIGN_UP_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        signingUp: false,
        signUpSuccess: true,
      },
    },
    {
      SIGN_UP_REGISTER_ERROR: 'tbd',
      attributes: ['signUpError'],
      stateMutations: {
        signingUp: false,
        signUpSuccess: false,
        signUpError: action => action.signUpError,
      },
    },
  ],
};

export default actionMeta;
