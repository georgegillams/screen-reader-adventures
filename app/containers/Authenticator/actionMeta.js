const actionMeta = {
  key: 'authenticator',
  actionDefinitions: [
    {
      REAUTHENTICATE: 'tbd',
      attributes: [],
      stateMutations: {
        sessionKey: action => action.sessionKey,
      },
    },
    {
      SESSION_KEY_CHANGED: 'tbd',
      attributes: ['sessionKey'],
      stateMutations: {
        reauthenticating: false,
        reauthenticationError: false,
      },
    },
    {
      REAUTHENTICATE_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        reauthenticating: false,
        reauthenticationSuccess: true,
        reauthenticationError: null,
      },
    },
    {
      REAUTHENTICATE_REGISTER_ERROR: 'tbd',
      attributes: ['reauthenticationError'],
      stateMutations: {
        reauthenticating: false,
        reauthenticationSuccess: false,
        reauthenticationError: action => action.reauthenticationError,
      },
    },
  ],
};

export default actionMeta;
