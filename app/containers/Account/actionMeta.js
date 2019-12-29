const actionMeta = {
  key: `account`,
  actionDefinitions: [
    {
      REQUEST_VERIFICATION_EMAIL: 'tbd',
      attributes: [],
      stateMutations: {
        requestingVerificationEmail: true,
        requestingError: false,
      },
    },
    {
      REQUEST_VERIFICATION_EMAIL_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        requestingVerificationEmail: false,
        requestingSuccess: true,
      },
    },
    {
      REQUEST_VERIFICATION_EMAIL_REGISTER_ERROR: 'tbd',
      attributes: ['requestingError'],
      stateMutations: {
        requestingVerificationEmail: false,
        requestingError: action => action.requestingError,
      },
    },
    {
      LOGOUT: 'tbd',
      attributes: [],
      stateMutations: {
        loggingOut: true,
        loggingOutError: false,
      },
    },
    {
      LOGOUT_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        loggingOut: false,
        loggingOutSuccess: true,
      },
    },
    {
      LOGOUT_REGISTER_ERROR: 'tbd',
      attributes: ['loggingOutError'],
      stateMutations: {
        loggingOut: false,
        loggingOutError: action => action.loggingOutError,
      },
    },
  ],
};

export default actionMeta;
