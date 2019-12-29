const actionMeta = {
  key: 'login',
  actionDefinitions: [
    {
      SET_CREDENTIALS: 'tbd',
      attributes: ['credentials'],
      stateMutations: {
        credentials: action => action.credentials,
        loggingIn: false,
        logInSuccess: false,
      },
    },
    {
      LOGIN: 'tbd',
      attributes: [],
      stateMutations: {
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
