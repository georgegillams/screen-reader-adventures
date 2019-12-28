const actionMeta = {
  key: 'magicLogin',
  actionDefinitions: [
    {
      LOGIN: 'tbd',
      attributes: ['token'],
      stateMutations: {
        token: action => action.token,
        loggingIn: true,
        logInError: null,
      },
    },
    {
      LOGIN_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        loggingIn: false,
        logInSuccess: true,
      },
    },
    {
      LOGIN_REGISTER_ERROR: 'tbd',
      attributes: ['logInError'],
      stateMutations: {
        loggingIn: false,
        logInSuccess: false,
        logInError: action => action.logInError,
      },
    },
  ],
};

export default actionMeta;
