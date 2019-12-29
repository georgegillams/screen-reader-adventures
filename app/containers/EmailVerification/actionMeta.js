const actionMeta = {
  key: 'verify_email',
  actionDefinitions: [
    {
      VERIFY_EMAIL: 'tbd',
      attributes: ['token'],
      stateMutations: {
        token: action => action.token,
        verifying: true,
        verifyError: null,
      },
    },
    {
      VERIFY_EMAIL_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        verifying: false,
        verifySuccess: true,
      },
    },
    {
      VERIFY_EMAIL_REGISTER_ERROR: 'tbd',
      attributes: ['verifyError'],
      stateMutations: {
        verifying: false,
        verifySuccess: false,
        verifyError: action => action.verifyError,
      },
    },
  ],
};

export default actionMeta;
